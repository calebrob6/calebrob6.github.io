"""Train a tiny Vision Transformer on MNIST and export weights as JSON."""
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import datasets, transforms
import json
import math
import sys

class PatchEmbed(nn.Module):
    def __init__(self, img_size=28, patch_size=7, in_chans=1, embed_dim=32):
        super().__init__()
        self.num_patches = (img_size // patch_size) ** 2  # 16
        self.proj = nn.Linear(patch_size * patch_size * in_chans, embed_dim)

    def forward(self, x):
        # x: [B, 1, 28, 28]
        B = x.shape[0]
        # Unfold into 7x7 patches: [B, 1, 4, 7, 4, 7] -> [B, 16, 49]
        x = x.unfold(2, 7, 7).unfold(3, 7, 7)  # [B, 1, 4, 4, 7, 7]
        x = x.contiguous().view(B, -1, 49)       # [B, 16, 49]
        return self.proj(x)                        # [B, 16, embed_dim]


class Attention(nn.Module):
    def __init__(self, dim=32, num_heads=2):
        super().__init__()
        self.num_heads = num_heads
        self.head_dim = dim // num_heads
        self.scale = self.head_dim ** -0.5
        self.qkv = nn.Linear(dim, dim * 3)
        self.proj = nn.Linear(dim, dim)

    def forward(self, x):
        B, N, C = x.shape
        qkv = self.qkv(x).reshape(B, N, 3, self.num_heads, self.head_dim).permute(2, 0, 3, 1, 4)
        q, k, v = qkv.unbind(0)  # [B, heads, N, head_dim]
        attn = (q @ k.transpose(-2, -1)) * self.scale
        attn = attn.softmax(dim=-1)
        x = (attn @ v).transpose(1, 2).reshape(B, N, C)
        return self.proj(x), attn


class TransformerBlock(nn.Module):
    def __init__(self, dim=32, num_heads=2, mlp_ratio=2):
        super().__init__()
        self.norm1 = nn.LayerNorm(dim)
        self.attn = Attention(dim, num_heads)
        self.norm2 = nn.LayerNorm(dim)
        self.mlp = nn.Sequential(
            nn.Linear(dim, dim * mlp_ratio),
            nn.GELU(),
            nn.Linear(dim * mlp_ratio, dim),
        )

    def forward(self, x):
        attn_out, attn_weights = self.attn(self.norm1(x))
        x = x + attn_out
        x = x + self.mlp(self.norm2(x))
        return x, attn_weights


class TinyViT(nn.Module):
    def __init__(self, img_size=28, patch_size=7, in_chans=1, num_classes=10,
                 embed_dim=32, depth=2, num_heads=2, mlp_ratio=2):
        super().__init__()
        self.patch_embed = PatchEmbed(img_size, patch_size, in_chans, embed_dim)
        num_patches = self.patch_embed.num_patches  # 16

        self.cls_token = nn.Parameter(torch.zeros(1, 1, embed_dim))
        self.pos_embed = nn.Parameter(torch.zeros(1, num_patches + 1, embed_dim))
        nn.init.trunc_normal_(self.cls_token, std=0.02)
        nn.init.trunc_normal_(self.pos_embed, std=0.02)

        self.blocks = nn.ModuleList([
            TransformerBlock(embed_dim, num_heads, mlp_ratio) for _ in range(depth)
        ])
        self.norm = nn.LayerNorm(embed_dim)
        self.head = nn.Linear(embed_dim, num_classes)

    def forward(self, x):
        B = x.shape[0]
        x = self.patch_embed(x)  # [B, 16, dim]
        cls = self.cls_token.expand(B, -1, -1)
        x = torch.cat([cls, x], dim=1)  # [B, 17, dim]
        x = x + self.pos_embed

        attn_maps = []
        for blk in self.blocks:
            x, attn = blk(x)
            attn_maps.append(attn)

        x = self.norm(x)
        return self.head(x[:, 0]), attn_maps  # CLS token


def train():
    device = torch.device('cpu')
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.1307,), (0.3081,))
    ])
    train_data = datasets.MNIST('/tmp/mnist', train=True, download=True, transform=transform)
    test_data = datasets.MNIST('/tmp/mnist', train=False, transform=transform)
    train_loader = torch.utils.data.DataLoader(train_data, batch_size=256, shuffle=True, num_workers=0)
    test_loader = torch.utils.data.DataLoader(test_data, batch_size=2000, shuffle=False, num_workers=0)

    model = TinyViT().to(device)
    total_params = sum(p.numel() for p in model.parameters())
    print(f"Total parameters: {total_params}", flush=True)

    optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=30)
    criterion = nn.CrossEntropyLoss()

    for epoch in range(30):
        model.train()
        total_loss = 0
        n_batches = 0
        for data, target in train_loader:
            data, target = data.to(device), target.to(device)
            optimizer.zero_grad()
            output, _ = model(data)
            loss = criterion(output, target)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
            n_batches += 1

        scheduler.step()

        model.eval()
        correct = 0
        total = 0
        with torch.no_grad():
            for data, target in test_loader:
                data, target = data.to(device), target.to(device)
                output, _ = model(data)
                pred = output.argmax(dim=1)
                correct += (pred == target).sum().item()
                total += target.size(0)
        acc = 100. * correct / total
        print(f"Epoch {epoch+1}: loss={total_loss/n_batches:.4f}, test_acc={acc:.2f}%", flush=True)

    return model


def round_list(lst, decimals=5):
    if isinstance(lst, list):
        return [round_list(x, decimals) for x in lst]
    return round(lst, decimals)


def export_weights(model, path='mnist_vit_weights.json'):
    weights = {}
    for name, param in model.named_parameters():
        weights[name] = round_list(param.detach().cpu().tolist())

    with open(path, 'w') as f:
        json.dump(weights, f, separators=(',', ':'))
    import os
    print(f"Weights saved to {path} ({os.path.getsize(path)} bytes)", flush=True)


def verify_model(model):
    model.eval()
    x = torch.randn(1, 1, 28, 28)
    with torch.no_grad():
        out, attn_maps = model(x)
        print(f"Output shape: {out.shape}")
        for i, a in enumerate(attn_maps):
            print(f"Attention block {i}: {a.shape}")
    sys.stdout.flush()


if __name__ == '__main__':
    model = train()
    verify_model(model)
    export_weights(model)
