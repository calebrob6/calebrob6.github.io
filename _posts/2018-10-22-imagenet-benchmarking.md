---
title: "How to reproduce ImageNet validation results"
date: 2018-10-22 00:00:00 -0800
permalink: /ml/imagenet/ilsvrc2012/2018/10/22/imagenet-benchmarking.html
tags:
  - ml
  - imagenet
  - ilsvrc2012
---

In this article I show how to reproduce the Top-1 and Top-5 accuracy results reported for [pre-trained models provided in the popular Keras python library](https://keras.io/applications/). The accompanying code can be found [on GitHub](https://github.com/calebrob6/imagenet_validation).

"ImageNet" validation results are frequently reported or referenced in computer vision literature but, unlike other benchmark datasets, it is not immediately obvious how to calculate such results from scratch. Validation results on ImageNet in particular are useful, even if you aren't interested in training new models on the full training set, due to the larger image sizes and difficulty of the 1000-way classification task. For example, if you are interested in developing adversarial attacks you might be interested in using pre-trained ImageNet models, perturbing images from the validation set, and measuring the model's performance relative to published baselines.

## Steps

### Downloading the raw data

"ImageNet" validation results on object classification tasks are usually calculated with the [ILSVRC2012](http://www.image-net.org/challenges/LSVRC/2012/) validation set. These validation results include those reported for the [pre-trained models from the Keras library](https://keras.io/applications/index.html#documentation-for-individual-models). The validation dataset is 6.74GB and can be downloaded slowly from the [ImageNet website](http://www.image-net.org/challenges/LSVRC/2012/nonpub-downloads) or quickly from [Academic Torrents](http://academictorrents.com/details/5d6d0df7ed81efd49ca99ea4737e0ae5e3a5f2e5). The `ILSVRC2012_img_val.tar` file contains 50,000 jpeg image files: "ILSVRC2012_val_00000000.JPEG", ..., "ILSVRC2012_val_00050000.JPEG".

The ILSVRC2012 development toolkit for Tasks 1 and 2 is also necessary to reproduce validation results and can also be downloaded from the [ImageNet website](http://www.image-net.org/challenges/LSVRC/2012/nonpub-downloads) (the "Development kit (Task 1 & 2)"). The files we need from this include:
- `readme.txt` - useful information about ImageNet concepts (synsets, WordNet, etc.) and how the data is structured.
- `data/ILSVRC2012_validation_ground_truth.txt` - a text file with 50,000 lines, one for each validation image, where line 0 contains the _ILSVRC2012\_ID_ label for "ILSVRC2012\_val\_00000000.JPEG", line 1 contains the label for "ILSVRC2012\_val\_00000001.JPEG", etc. Each _ILSVRC2012\_ID_ label is an integer from 1 to 1000. 
- `data/meta.mat` - a Matlab file that contains a mapping between the 1000 _ILSVRC2012\_ID_ labels, their synset IDs, and what the classes represent (e.g. "dog").

### Keras/Caffe labels are different

The ordering of classes predicted by the Imagenet pre-trained models from Keras does not directly align with the _ILSVRC2012\_ID_ labeling. For example, when a Keras model predicts class "0", it corresponds to synset "n01440764", which is "tench, Tinca tinca", whereas the first _ILSVRC2012\_ID_, "1", corresponds to synset "n02119789", which is "kit fox, Vulpes macrotis".

This discrepancy is due to a design choice in the Caffe library where the synsets names were sorted alphabetically and labeled from 0 to 999 instead of used as is from the ILSVRC devkit (for more information see [here](http://caffe.berkeleyvision.org/gathered/examples/imagenet.html)). This mapping, between the class numbers predicted by Keras pretrained numbers and synset/class names, can be found in the ["synset\_words.txt" file from the Caffe Github repository](https://github.com/HoldenCaulfieldRye/caffe/blob/master/data/ilsvrc12/synset_words.txt). `synset_words.txt` contains 1,000 lines, where line 0 contains the synset/class name corresponding to "class 0" predicted by the Keras models, line 1 contains the mapping for "class 1", etc.


### Preprocessing validation set images

The images in the ImageNet validation set come in a wide variety of different sizes and must be resized to _224x224_ in a specific way in order to reproduce the Keras benchmark results. For every image in the validation set we need to apply the following process:

1. Load the image data in a floating point format.
2. Resize the smallest side of the image to _256_ pixels using bicubic interpolation over 4x4 pixel neighborhood (using OpenCVs resize method with the "INTER\_CUBIC" interpolation flag). The larger side should be resized to maintain the original aspect ratio of the image.
3. Crop the central _224x224_ window from the resized image.
4. Save the image in RGB format.

### Applying Keras pretrained models

The different models under `keras.applications` don't all apply the same preprocessing steps, however each model has a `preprocess_input` method that expects floating point RGB images, like we calculated above. As an example of these differences, the `keras.applications.vgg19.preprocess_input` method will convert the input to BGR format and subtract _103.939_ from the blue channel, _116.779_ from the green channel, and _123.68_ from the red channel, while the `keras.applications.mobilenet.preprocess_input` method will divide all channels by _127.5_ then subtract _1_. These differences stem from what framework each model was trained in. With the preprocessed images from the previous step we can load a Keras model, call its assosciated `preprocess_input` method on all the images, and finally calculate the Top-1 and Top-5 accuracy between the model's predictions and the ground truth from `data/ILSVRC2012_validation_ground_truth.txt` (with the necessary label conversions).

### Code

All the steps above are shown in the notebooks from the accompanying [GitHub repository](https://github.com/calebrob6/imagenet_validation):
- [1. Preprocess ImageNet validation set](https://github.com/calebrob6/imagenet_validation/blob/master/1.%20Preprocess%20ImageNet%20validation%20set.ipynb) - converts the raw ILSVRC2012 validation images/labels into NumPy arrays (`.npy` files) that can be used "as is" with pre-trained Keras models
- [2. Benchmark Keras pretrained models on ImageNet.ipynb](https://github.com/calebrob6/imagenet_validation/blob/master/2.%20Benchmark%20Keras%20pretrained%20models%20on%20ImageNet.ipynb) - uses the preprocessed data and the VGG19 pre-trained network to reproduce the Top-1 and Top-5 accuracy reported in the Keras documentation.


{% comment %}
https://github.com/taehoonlee/tensornets
https://github.com/keras-team/keras-applications/blob/master/keras_applications/densenet.py
https://github.com/keras-team/keras/issues/8672
https://keras.io/applications/
{% endcomment %}
