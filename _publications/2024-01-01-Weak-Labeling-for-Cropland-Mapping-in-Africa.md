---
title: "Weak Labeling for Cropland Mapping in Africa"
collection: publications
permalink: /publication/2024-01-01-Weak-Labeling-for-Cropland-Mapping-in-Africa
date: 2024-01-01
venue: 'arXiv preprint arXiv:2401.07014'
paperurl: 'https://arxiv.org/abs/2401.07014'
citation: 'Gilles Hacheme, Akram Zaytar, Girmaw Tadesse, Caleb Robinson, Rahul Dodhia, Juan Ferres, Stephen Wood. &quot;Weak Labeling for Cropland Mapping in Africa.&quot; arXiv preprint arXiv:2401.07014, 2024.'
excerpt: 'We propose a simple method for extracting stronger labels from weak cropland labels and an unsupervised segmentation of satellite imagery. We show, in a scenario in Kenya where we only have 33 human-annotated labels, that adding strong labels mined by our method increases the F1 score for the cropland category from
0.53 (without mining) to 0.84.
<br/><br/>
[Paper](https://arxiv.org/abs/2401.07014)
'
image: '/assets/images/paper_thumbnails/weak_cropland_labeling.jpg'
---
[Paper](https://arxiv.org/abs/2401.07014){:target="_blank"}

We propose a simple method for extracting stronger labels from weak cropland labels and an unsupervised segmentation of satellite imagery. We show, in a scenario in Kenya where we only have 33 human-annotated labels, that adding strong labels mined by our method increases the F1 score for the cropland category from
0.53 (without mining) to 0.84.

<p align="center">
<img src="/assets/images/paper_thumbnails/weak_cropland_labeling.jpg" style="width:100%;"/><br/>
<b>Figure 1.</b>An overview of our proposed approach. Given satellite imagery (A) and weak cropland labels (C) over a given AOI we first use a K-Means clustering and filtering method to perform unsupervised object segmentation of the imagery (B). We intersect the resulting objects (polygons) with the weak labels to mine stronger positive and negative samples (D). Our experimental results show that adding these mined labels to human labels improves model performance.
</p>

Cite as: 
```bibtex
@article{hacheme2024weak,
    author = "Hacheme, Gilles Quentin and Zaytar, Akram and Tadesse, Girmaw Abebe and Robinson, Caleb and Dodhia, Rahul and Ferres, Juan M Lavista and Wood, Stephen",
    title = "Weak Labeling for Cropland Mapping in Africa",
    journal = "arXiv preprint arXiv:2401.07014",
    year = "2024",
    url = "https://arxiv.org/abs/2401.07014"
}
```