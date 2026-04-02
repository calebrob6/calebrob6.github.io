"""Assemble cnn-vit_playground.html with both CNN and ViT weights embedded."""
import json

# Load all data
cnn_weights = json.dumps(json.load(open('mnist_cnn_weights.json')), separators=(',',':'))
vit_weights = json.dumps(json.load(open('mnist_vit_weights.json')), separators=(',',':'))
samples = json.dumps(json.load(open('mnist_sample_digits.json')), separators=(',',':'))

html = open('cnn-vit_playground_template.html').read()
html = html.replace('__CNN_WEIGHTS__', cnn_weights)
html = html.replace('__VIT_WEIGHTS__', vit_weights)
html = html.replace('__SAMPLES__', samples)

with open('cnn-vit_playground.html', 'w') as f:
    f.write(html)
print(f'Written cnn-vit_playground.html ({len(html)} bytes)')
