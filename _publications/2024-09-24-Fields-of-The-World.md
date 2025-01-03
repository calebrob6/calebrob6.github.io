---
title: "Fields of The World: A Machine Learning Benchmark Dataset For Global Agricultural Field Boundary Segmentation"
collection: publications
permalink: /publication/2024-09-24-Fields-of-The-World
date: 2024-09-24
venue: 'arXiv preprint arXiv:2409.16252'
paperurl: 'https://arxiv.org/abs/2409.16252'
citation: 'Hannah Kerner, Snehal Chaudhari, Aninda Ghosh, Caleb Robinson, Adeel Ahmad, Eddie Choi, Nathan Jacobs, Chris Holmes, Matthias Mohr, Rahul Dodhia, Juan M Lavista Ferres, Jennifer Marcus. &quot;Fields of The World: A Machine Learning Benchmark Dataset For Global Agricultural Field Boundary Segmentation.&quot; arXiv preprint arXiv:2409.16252, 2024.'
excerpt: 'We present Fields of The World (FTW) -- a novel ML benchmark dataset for agricultural field instance segmentation spanning 24 countries on four continents (Europe, Africa, Asia, and South America). FTW is an order of magnitude larger than previous datasets with 70,462 samples, each containing instance and semantic segmentation masks paired with multi-date, multi-spectral Sentinel-2 satellite images.
<br/><br/>
[Webpage](https://fieldsofthe.world/) / [Paper](https://arxiv.org/abs/2409.16252) / [Code](https://github.com/fieldsoftheworld/ftw-baselines) 
'
image: '/assets/images/paper_thumbnails/ftw_example.png'
---
[Paper](https://arxiv.org/abs/2409.16252){:target="_blank"}

We provide results from baseline models for the new Fields of The World (FTW) benchmark, show that models trained on FTW have better zero-shot and fine-tuning performance in held-out countries than models that are not pre-trained with diverse datasets, and show positive qualitative zero-shot results of FTW models in a real-world scenario -- running on Sentinel-2 scenes over Ethiopia.

<p align="center">
<img src="/assets/images/paper_thumbnails/ftw_example.png" style="width:100%;"/><br/>
<b>Figure 1.</b> Training samples from four continents, demonstrating the diversity within Fields of The World.
</p>

Cite as: 
```bibtex
@article{kerner2024fields,
  title={Fields of The World: A Machine Learning Benchmark Dataset For Global Agricultural Field Boundary Segmentation},
  author={Kerner, Hannah and Chaudhari, Snehal and Ghosh, Aninda and Robinson, Caleb and Ahmad, Adeel and Choi, Eddie and Jacobs, Nathan and Holmes, Chris and Mohr, Matthias and Dodhia, Rahul and others},
  journal={arXiv preprint arXiv:2409.16252},
  year={2024}
}
```