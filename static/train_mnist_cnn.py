"""Train a small CNN on MNIST and export weights as JSON for the web app."""
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import datasets, transforms
import json
import sys

class MNISTNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 8, 3)       # [1,28,28] -> [8,26,26]
        self.pool = nn.MaxPool2d(2)            # [8,26,26] -> [8,13,13]
        self.conv2 = nn.Conv2d(8, 16, 3)      # [8,13,13] -> [16,11,11]
        self.conv3 = nn.Conv2d(16, 32, 3)     # [16,11,11] -> [32,9,9]
        self.fc = nn.Linear(32, 10)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = F.relu(self.conv2(x))
        x = F.relu(self.conv3(x))
        x = x.mean(dim=[2, 3])
        return self.fc(x)

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

    model = MNISTNet().to(device)
    optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
    criterion = nn.CrossEntropyLoss()

    for epoch in range(25):
        model.train()
        total_loss = 0
        n_batches = 0
        for data, target in train_loader:
            data, target = data.to(device), target.to(device)
            optimizer.zero_grad()
            output = model(data)
            loss = criterion(output, target)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
            n_batches += 1

        model.eval()
        correct = 0
        total = 0
        with torch.no_grad():
            for data, target in test_loader:
                data, target = data.to(device), target.to(device)
                output = model(data)
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

def export_weights(model, path='mnist_cnn_weights.json'):
    weights = {}
    for name, param in model.named_parameters():
        weights[name] = round_list(param.detach().cpu().tolist())
    with open(path, 'w') as f:
        json.dump(weights, f, separators=(',', ':'))
    import os
    print(f"Weights saved to {path} ({os.path.getsize(path)} bytes)", flush=True)

def export_sample_digits(path='mnist_sample_digits.json'):
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.1307,), (0.3081,))
    ])
    test_data = datasets.MNIST('/tmp/mnist', train=False, transform=transform)
    raw_transform = transforms.ToTensor()
    raw_data = datasets.MNIST('/tmp/mnist', train=False, transform=raw_transform)

    samples = {}
    raw_samples = {}
    for i in range(len(test_data)):
        img, label = test_data[i]
        raw_img, _ = raw_data[i]
        if label not in samples:
            samples[label] = img.squeeze().tolist()
            raw_samples[label] = raw_img.squeeze().tolist()
        if len(samples) == 10:
            break

    result = {
        'normalized': {str(k): round_list(v, 4) for k, v in sorted(samples.items())},
        'raw': {str(k): round_list(v, 4) for k, v in sorted(raw_samples.items())}
    }
    with open(path, 'w') as f:
        json.dump(result, f, separators=(',', ':'))
    print(f"Sample digits saved to {path}", flush=True)

def verify_model(model):
    model.eval()
    x = torch.randn(1, 1, 28, 28)
    with torch.no_grad():
        print(f"After conv1: {model.conv1(x).shape}")
        x1 = F.relu(model.conv1(x))
        x2 = model.pool(x1)
        print(f"After pool: {x2.shape}")
        x3 = F.relu(model.conv2(x2))
        print(f"After conv2: {x3.shape}")
        x4 = F.relu(model.conv3(x3))
        print(f"After conv3: {x4.shape}")
        x5 = x4.mean(dim=[2,3])
        print(f"After avg pool: {x5.shape}")
        x6 = model.fc(x5)
        print(f"After fc: {x6.shape}")
    sys.stdout.flush()

if __name__ == '__main__':
    model = train()
    verify_model(model)
    export_weights(model)
    export_sample_digits()
