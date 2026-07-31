---
permalink: /
title: "Bio"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<a id="bio"></a>

I am a Principal Research Scientist in the [Microsoft AI for Good Research Lab](https://www.microsoft.com/en-us/research/group/ai-for-good-research-lab/) where I co-lead the [Geospatial ML research group](https://www.microsoft.com/en-us/research/project/geospatial-machine-learning/) and focus on tackling large scale applied problems at the intersection of remote sensing and machine learning/computer vision. Generally, I'm interested in research topics that facilitate using remotely sensed data more effectively in conservation, sustainability, and damage response application. For example: self-supervised methods for training deep learning models with large amounts of unlabeled satellite imagery, human-in-the-loop methods for creating and validating modeled layers, and domain adaptation methods for developing models that can generalize over space and time. Similarly, I am also interested in creating open-source tools that facilitate using remotely sensed data in machine learning pipelines -- I am a creator/maintainer of the [torchgeo](https://github.com/microsoft/torchgeo) library and ["satellite imagery labeling tool"](https://github.com/microsoft/satellite-imagery-labeling-tool).

I graduated from the Georgia Institute of Technology with a PhD in 2020 under the supervision of [Bistra Dilkina](https://viterbi.usc.edu/directory/faculty/Dilkina/Bistra) with a dissertation titled, ["Large scale machine learning for geospatial problems in computational sustainability"](https://repository.gatech.edu/entities/publication/af1a7913-e832-475e-a25b-d030dcb42bc5/full).

I am also an adjunct faculty member at Arizona State University, where I taught CSE 475: Foundations of Machine Learning with [Hannah Kerner](https://hannah-rae.github.io/).


## Projects

<div class="demo-grid">
  <div class="demo-card">
    <a href="https://www.globalrenewableswatch.org/"><img src="/assets/images/demos/project-grw.jpg" alt="Global Renewables Watch map" /></a>
    <div class="demo-card__body">
      <p class="demo-card__title">Global Renewables Watch</p>
      <p class="demo-card__desc">A temporal dataset of global solar and wind energy installations derived from satellite imagery, with Planet and The Nature Conservancy.</p>
      <p class="demo-card__links"><a href="https://www.globalrenewableswatch.org/">Visualizer</a> / <a href="https://arxiv.org/abs/2503.14860">Paper</a> / <a href="https://github.com/microsoft/global-renewables-watch">GitHub</a></p>
    </div>
  </div>
  <div class="demo-card">
    <a href="https://visualizers.aiforgood.ai/buildings/index.html"><img src="/assets/images/demos/project-buildings.jpg" alt="Global building density map" /></a>
    <div class="demo-card__body">
      <p class="demo-card__title">TEMPO: Building Density and Height</p>
      <p class="demo-card__desc">Global temporal building density and height estimation from satellite imagery.</p>
      <p class="demo-card__links"><a href="https://visualizers.aiforgood.ai/buildings/index.html">Visualizer</a> / <a href="https://arxiv.org/abs/2511.12104">Paper</a> / <a href="https://github.com/microsoft/buildings">GitHub</a></p>
    </div>
  </div>
  <div class="demo-card">
    <a href="https://fieldsofthe.world/"><img src="/assets/images/demos/project-fieldboundaries.jpg" alt="Fields of The World training samples" /></a>
    <div class="demo-card__body">
      <p class="demo-card__title">Field Boundary Delineation</p>
      <p class="demo-card__desc">Fields of The World: benchmark datasets, models, and global 10m maps for agricultural field boundary segmentation.</p>
      <p class="demo-card__links"><a href="https://fieldsofthe.world/ftw-inference-app/">Visualizer</a> / <a href="https://fieldsofthe.world/">Website</a> / <a href="https://github.com/fieldsoftheworld/ftw-baselines">GitHub</a> / Papers: <a href="https://arxiv.org/abs/2605.11055">Global Map</a> · <a href="https://arxiv.org/abs/2603.27101">PRUE</a> · <a href="https://arxiv.org/abs/2409.16252">FTW</a> · <a href="https://arxiv.org/abs/2607.04449">FTP</a></p>
    </div>
  </div>
  <div class="demo-card">
    <a href="https://visualizers.aiforgood.ai/damage-assessment/index.html"><img src="/assets/images/demos/project-damage-assessment.jpg" alt="Building damage assessment example" /></a>
    <div class="demo-card__body">
      <p class="demo-card__title">Building Damage Assessment</p>
      <p class="demo-card__desc">Rapid post-disaster mapping of building damage from satellite and aerial imagery, used by responders in the hours after an event.</p>
      <p class="demo-card__links"><a href="https://visualizers.aiforgood.ai/damage-assessment/index.html">Visualizer</a> / <a href="https://arxiv.org/abs/2607.11838">Paper</a> / <a href="https://github.com/microsoft/building-damage-assessment/">GitHub</a> / <a href="https://github.com/microsoft/haste/">HASTE</a></p>
    </div>
  </div>
</div>


## Demos
{: #demos}

Interactive demos of some of our recent work — click through to try them:

<div class="demo-grid">
  <a class="demo-card" href="https://calebrob.com/throughput-bench/">
    <img src="/assets/images/demos/throughput-bench.jpg" alt="Throughput Bench" />
    <div class="demo-card__body">
      <p class="demo-card__title">Throughput Bench</p>
      <p class="demo-card__desc">How fast can a deep learning model map the planet? Benchmark results for geospatial models across GPUs, precisions, and batch sizes.</p>
    </div>
  </a>
  <a class="demo-card" href="https://calebrob.com/deltabit/">
    <img src="/assets/images/demos/deltabit.jpg" alt="DeltaBit" />
    <div class="demo-card__body">
      <p class="demo-card__title">DeltaBit</p>
      <p class="demo-card__desc">Label, train, and predict per-pixel change detection in the browser over compressed AlphaEarth embedding-difference tiles.</p>
    </div>
  </a>
  <a class="demo-card" href="https://calebrob.com/sentinel2-paint/">
    <img src="/assets/images/demos/s2-paint.jpg" alt="Sentinel-2 Paint" />
    <div class="demo-card__body">
      <p class="demo-card__title">Sentinel-2 Paint</p>
      <p class="demo-card__desc">Recreates any photo as a mosaic of real Sentinel-2 satellite imagery patches.</p>
    </div>
  </a>
</div>


## Software

<div class="demo-grid">
  <a class="demo-card" href="https://github.com/microsoft/torchgeo">
    <img src="/assets/images/demos/software-torchgeo.png" alt="TorchGeo logo" />
    <div class="demo-card__body">
      <p class="demo-card__title">TorchGeo</p>
      <p class="demo-card__desc">PyTorch datasets, samplers, transforms, and pre-trained models for geospatial data. I am a co-creator and maintainer.</p>
    </div>
  </a>
  <a class="demo-card" href="https://github.com/torchgeo/torchgeo-bench">
    <img src="/assets/images/demos/software-torchgeo-bench.png" alt="TorchGeo logo sitting on a wooden bench" />
    <div class="demo-card__body">
      <p class="demo-card__title">torchgeo-bench</p>
      <p class="demo-card__desc">Lightweight benchmarking of frozen geospatial foundation models on the GeoBench suites, with KNN and linear-probe metrics.</p>
    </div>
  </a>
  <a class="demo-card" href="https://github.com/microsoft/satellite-imagery-labeling-tool">
    <img src="/assets/images/demos/software-labeling-tool.jpg" alt="Satellite Imagery Labeling Tool screenshot" />
    <div class="demo-card__body">
      <p class="demo-card__title">Satellite Imagery Labeling Tool</p>
      <p class="demo-card__desc">Lightweight web interface for creating and sharing vector annotations over satellite and aerial imagery scenes.</p>
    </div>
  </a>
  <a class="demo-card" href="https://github.com/calebrob6/vsrecent">
    <img src="/assets/images/demos/software-vsrecent.jpg" alt="VS Recent launcher screenshot" />
    <div class="demo-card__body">
      <p class="demo-card__title">vsrecent</p>
      <p class="demo-card__desc">Tiny Windows launcher for VS Code's "Open Recent" projects.</p>
    </div>
  </a>
</div>


## Talks

- **Keynote** at the [EarthVision Workshop at CVPR 2026](https://www.grss-ieee.org/events/earthvision-2026/) — *From Local to Global Maps from Satellite Imagery: ML Techniques and Applications* (June 2026, Denver, CO)
- **Invited talk** at the NOAA Northeast Fisheries Science Center AI 101 Symposium (May 2026)
- **Keynote** at the [CV4EO Workshop at WACV 2026](https://geoai.ornl.gov/cv4eo-wacv/) — *Applied GeoML: From Local to Global* (March 2026, Tucson, AZ)
- **Invited talk** at the [ITU AI for Good webinar](https://aiforgood.itu.int/event/mapping-connectivity-for-saving-lives-the-early-warning-connectivity-map-ewcm/) — *Mapping Connectivity for Saving Lives: The Early Warning Connectivity Map (EWCM)* (January 2026, online)


## News

**September 24th, 2024** -- New preprint describing the largest-to-date ML dataset of field boundary labels and satellite imagery! *Fields of The World: A Machine Learning Benchmark Dataset For Global Agricultural Field Boundary Segmentation* (Accepted to AAAI 2025 AI for Social Impact track) <br/> [Webpage](https://fieldsofthe.world/) / [ArXiv](https://arxiv.org/abs/2409.16252) / [AAAI Proceedings](https://ojs.aaai.org/index.php/AAAI/article/view/35034) / [Code](https://github.com/fieldsoftheworld/ftw-baselines)

**August 5th, 2024** -- Our paper, *Analyzing Decades-Long Environmental Changes in Namibia Using Archival Aerial Photography and Deep Learning* won Best Paper Award 🏆 at the [Sustainable Transition with AI](https://stai.jeju.ai/) workshop at IJCAI <br/> [Project page](publication/2024-04-12-Analyzing-Historical-Aerial-Imagery) / [Paper](https://arxiv.org/abs/2404.08544) 


**May 1st, 2024** -- Position paper accepted at [ICML 2024](https://icml.cc/), *Mission Critical--Satellite Data is a Distinct Modality in Machine Learning* <br/> [Project page](publication/2024-01-01-Mission-Critical-Satellite-Data-is-a-Distinct-Modality-in-Machine-Learning) / [Paper](https://arxiv.org/abs/2402.01444) 


**April 12th, 2024** -- New preprint released, *Analyzing Decades-Long Environmental Changes in Namibia Using Archival Aerial Photography and Deep Learning* <br/> [Project page](publication/2024-04-12-Analyzing-Historical-Aerial-Imagery) / [Paper](https://arxiv.org/abs/2404.08544) 


**April 8th, 2024** -- Paper accepted at CVPR [Perception Beyond the Visibile Spectrum 2024 Workshop](https://pbvs-workshop.github.io/), *Revisiting Pre-trained Remote Sensing Model Benchmarks: Resizing and Normalization Matters* <br/> [Project page](publication/2023-01-01-Revisiting-Pre-trained-Remote-Sensing-Model-Benchmarks-Resizing-and-Normalization-Matters) / [Paper](https://arxiv.org/abs/2305.13456) 


**March 20th, 2024** -- New website!


**March 15th, 2024** -- We have two papers accepted at [IGARSS 2024](https://www.2024.ieeeigarss.org/index.php)!
- *Seeing the Roads Through the Trees: A Benchmark for Modeling Spatial Dependencies with Aerial Imagery* <br/> [Project page](publication/2024-01-01-Seeing-the-Roads-Through-the-Trees-A-Benchmark-for-Modeling-Spatial-Dependencies-with-Aerial-Imagery) / [Paper](https://arxiv.org/abs/2401.06762) / [Code](https://github.com/isaaccorley/ChesapeakeRSC)
- *Weak Labeling for Cropland Mapping in Africa* <br/> [Project page](publication/2024-01-01-Weak-Labeling-for-Cropland-Mapping-in-Africa) / [Paper](https://arxiv.org/abs/2401.07014)


**March 3rd, 2024** -- We have two papers accepted at the [Machine Learning for Remote Sensing Workshop](https://ml-for-rs.github.io/iclr2024/) at ICLR 2024!
- *A Change Detection Reality Check* <br/> [Project page](publication/2024-01-01-A-Change-Detection-Reality-Check) / [Paper](https://arxiv.org/abs/2402.06994) / [Code](https://github.com/isaaccorley/a-change-detection-reality-check)
- *Bootstrapping Rare Object Detection in High-Resolution Satellite Imagery* <br/> [Project page](publication/2024-01-01-Bootstrapping-Rare-Object-Detection-in-High-Resolution-Satellite-Imagery) / [Paper](https://arxiv.org/abs/2403.02736)


**February 2nd, 2024** -- New preprint released, *Mission Critical--Satellite Data is a Distinct Modality in Machine Learning* <br/> [Project page](publication/2024-01-01-Mission-Critical-Satellite-Data-is-a-Distinct-Modality-in-Machine-Learning) / [Paper](https://arxiv.org/abs/2402.01444) 


## 2023


**December 15th, 2023** -- I really enjoyed speaking on a panel at the [2023 NeurIPS Workshop on Computational Sustainability: Pitfalls and Promises from Theory to Deployment](https://www.compsust.net/compsust-2023/) in New Orleans.


**November 30th, 2023** -- New preprint, *SatCLIP: Global, General-Purpose Location Embeddings with Satellite Imagery* <br/> [Project page](publication/2023-01-01-SatCLIP-Global-General-Purpose-Location-Embeddings-with-Satellite-Imagery) / [Paper](https://arxiv.org/abs/2311.17179) / [Code](https://github.com/microsoft/satclip)


**September 22nd, 2023** -- We have a paper accepted at the [NeurIPS 2023 Datasets and Benchmarks track](https://neurips.cc/Conferences/2023)!
- *SSL4EO-L: Datasets and Foundation Models for Landsat Imagery* <br/> [Project page](publication/2024-01-01-SSL4EO-L-Datasets-and-Foundation-Models-for-Landsat-Imagery) / [Paper](https://arxiv.org/abs/2306.09424) / [Code](https://github.com/microsoft/torchgeo/tree/main/experiments/ssl4eo)


**July 26th, 2023** -- Our paper, *Harnessing AI and robotics in humanitarian assistance and disaster response*, in Science Robotics is out! <br/> [Project page](publication/2023-01-01-Harnessing-AI-and-Robotics-in-Humanitarian-Assistance-and-Disaster-Response) / [Paper](https://www.science.org/doi/abs/10.1126/scirobotics.adj2767)


**July 22nd, 2023** -- We have a paper accepted at the [Artificial Intelligence for Humanitarian Assistance and Disaster Response Workshop at ICCV](https://www.hadr.ai/previous-versions/iccv-2023/accepted-papers-iccv23)
- *Rapid Building Damage Assessment Workflow: An Implementation for the 2023 Rolling Fork, Mississippi Tornado Event* <br/> [Project page](publication/2023-01-01-Rapid-Building-Damage-Assessment-Workflow-An-Implementation-for-the-2023-Rolling-Fork-Mississippi-Tornado-Event) / [Paper](https://arxiv.org/abs/2306.12589)


**June 30th, 2023** -- We have a paper accepted at [ACM COMPASS](https://2023.compass.hosting.acm.org/)
- *Poverty Rate Prediction Using Multi-Modal Survey and Earth Observation Data* <br/> [Project page](publication/2023-01-01-Poverty-Rate-Prediction-Using-Multi-Modal-Survey-and-Earth-Observation-Data) / [Paper](https://arxiv.org/abs/2307.11921)


**June 9th, 2023** -- New preprint, *Open Data on GitHub: Unlocking the Potential of AI* <br/> [Project page](publication/2023-01-01-Open-Data-on-GitHub-Unlocking-the-Potential-of-AI) / [Paper](https://arxiv.org/abs/2306.06191)


**May 22nd, 2023** -- New preprint alert! *Revisiting pre-trained remote sensing model benchmarks: resizing and normalization matters* <br/> [Project page](publication/2023-01-01-Revisiting-Pre-trained-Remote-Sensing-Model-Benchmarks-Resizing-and-Normalization-Matters) / [Paper](https://arxiv.org/abs/2305.13456) / [Code](https://github.com/isaaccorley/resize-is-all-you-need)
