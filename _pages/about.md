---
permalink: /
title: "Bio"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I am a Principal Research Scientist in the [Microsoft AI for Good Research Lab](https://www.microsoft.com/en-us/research/group/ai-for-good-research-lab/) where I co-lead the [Geospatial ML research group](https://www.microsoft.com/en-us/research/project/geospatial-machine-learning/) and focus on tackling large scale applied problems at the intersection of remote sensing and machine learning/computer vision. Generally, I'm interested in research topics that facilitate using remotely sensed data more effectively in conservation, sustainability, and damage response application. For example: self-supervised methods for training deep learning models with large amounts of unlabeled satellite imagery, human-in-the-loop methods for creating and validating modeled layers, and domain adaptation methods for developing models that can generalize over space and time. Similarly, I am also interested in creating open-source tools that facilitate using remotely sensed data in machine learning pipelines -- I am a creator/maintainer of the [torchgeo](https://github.com/microsoft/torchgeo) library and ["satellite imagery labeling tool"](https://github.com/microsoft/satellite-imagery-labeling-tool).
{: #bio}

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
      <p class="demo-card__stats"><i class="fas fa-star" aria-hidden="true"></i> 14 &nbsp; <i class="fas fa-users" aria-hidden="true"></i> 1 contributor</p>
    </div>
  </a>
  <a class="demo-card" href="https://calebrob.com/deltabit/">
    <img src="/assets/images/demos/deltabit.jpg" alt="DeltaBit" />
    <div class="demo-card__body">
      <p class="demo-card__title">DeltaBit</p>
      <p class="demo-card__desc">Label, train, and predict per-pixel change detection in the browser over compressed AlphaEarth embedding-difference tiles.</p>
      <p class="demo-card__stats"><i class="fas fa-star" aria-hidden="true"></i> 2 &nbsp; <i class="fas fa-users" aria-hidden="true"></i> 2 contributors</p>
    </div>
  </a>
  <a class="demo-card" href="https://calebrob.com/sentinel2-paint/">
    <img src="/assets/images/demos/s2-paint.jpg" alt="Sentinel-2 Paint" />
    <div class="demo-card__body">
      <p class="demo-card__title">Sentinel-2 Paint</p>
      <p class="demo-card__desc">Recreates any photo as a mosaic of real Sentinel-2 satellite imagery patches.</p>
      <p class="demo-card__stats"><i class="fas fa-star" aria-hidden="true"></i> 6 &nbsp; <i class="fas fa-users" aria-hidden="true"></i> 1 contributor</p>
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
      <p class="demo-card__stats"><i class="fas fa-star" aria-hidden="true"></i> 4.1k &nbsp; <i class="fas fa-users" aria-hidden="true"></i> 128 contributors</p>
    </div>
  </a>
  <a class="demo-card" href="https://github.com/torchgeo/torchgeo-bench">
    <img src="/assets/images/demos/software-torchgeo-bench.png" alt="TorchGeo logo sitting on a wooden bench" />
    <div class="demo-card__body">
      <p class="demo-card__title">torchgeo-bench</p>
      <p class="demo-card__desc">Lightweight benchmarking of frozen geospatial foundation models on the GeoBench suites, with KNN and linear-probe metrics.</p>
      <p class="demo-card__stats"><i class="fas fa-star" aria-hidden="true"></i> 24 &nbsp; <i class="fas fa-users" aria-hidden="true"></i> 5 contributors</p>
    </div>
  </a>
  <a class="demo-card" href="https://github.com/microsoft/satellite-imagery-labeling-tool">
    <img src="/assets/images/demos/software-labeling-tool.jpg" alt="Satellite Imagery Labeling Tool screenshot" />
    <div class="demo-card__body">
      <p class="demo-card__title">Satellite Imagery Labeling Tool</p>
      <p class="demo-card__desc">Lightweight web interface for creating and sharing vector annotations over satellite and aerial imagery scenes.</p>
      <p class="demo-card__stats"><i class="fas fa-star" aria-hidden="true"></i> 294 &nbsp; <i class="fas fa-users" aria-hidden="true"></i> 7 contributors</p>
    </div>
  </a>
  <a class="demo-card" href="https://github.com/calebrob6/dynamic_world_pytorch">
    <img src="/assets/images/demos/software-dynamic-world.jpg" alt="Sentinel-2 imagery next to Dynamic World land cover predictions" />
    <div class="demo-card__body">
      <p class="demo-card__title">dynamic_world_pytorch</p>
      <p class="demo-card__desc">PyTorch port of Google's Dynamic World 10m land cover model — a bit-exact match to the official TensorFlow weights.</p>
      <p class="demo-card__stats"><i class="fas fa-star" aria-hidden="true"></i> 14 &nbsp; <i class="fas fa-users" aria-hidden="true"></i> 1 contributor</p>
    </div>
  </a>
  <a class="demo-card" href="https://github.com/calebrob6/s2-superres">
    <img src="/assets/images/demos/software-s2-superres.jpg" alt="Sentinel-2 super-resolution comparison" />
    <div class="demo-card__body">
      <p class="demo-card__title">s2-superres</p>
      <p class="demo-card__desc">Multi-temporal Sentinel-2 super-resolution by optimization.</p>
      <p class="demo-card__stats"><i class="fas fa-star" aria-hidden="true"></i> 13 &nbsp; <i class="fas fa-users" aria-hidden="true"></i> 1 contributor</p>
    </div>
  </a>
  <a class="demo-card" href="https://github.com/calebrob6/maplibre-gl_components">
    <img src="/assets/images/demos/software-maplibre.jpg" alt="Map swipe comparison illustration" />
    <div class="demo-card__body">
      <p class="demo-card__title">maplibre-gl_components</p>
      <p class="demo-card__desc">Single-file MapLibre GL JS plugins: swipe map comparisons and Cloud Optimized GeoTIFF rendering, no build step or tile server.</p>
      <p class="demo-card__stats"><i class="fas fa-star" aria-hidden="true"></i> 0 &nbsp; <i class="fas fa-users" aria-hidden="true"></i> 1 contributor</p>
    </div>
  </a>
  <a class="demo-card" href="https://github.com/calebrob6/vsrecent">
    <img src="/assets/images/demos/software-vsrecent.jpg" alt="VS Recent launcher screenshot" />
    <div class="demo-card__body">
      <p class="demo-card__title">vsrecent</p>
      <p class="demo-card__desc">Tiny Windows launcher for VS Code's "Open Recent" projects.</p>
      <p class="demo-card__stats"><i class="fas fa-star" aria-hidden="true"></i> 0 &nbsp; <i class="fas fa-users" aria-hidden="true"></i> 1 contributor</p>
    </div>
  </a>
</div>


## Talks

- **Keynote** at the [EarthVision Workshop at CVPR 2026](https://www.grss-ieee.org/events/earthvision-2026/) — *From Local to Global Maps from Satellite Imagery: ML Techniques and Applications* (June 2026, Denver, CO)
- **Invited talk** at the NOAA Northeast Fisheries Science Center AI 101 Symposium — *Geospatial ML for Sea Lions, Whales, and Buildings* (May 2026)
- **Keynote** at the [CV4EO Workshop at WACV 2026](https://geoai.ornl.gov/cv4eo-wacv/) — *Applied GeoML: From Local to Global* (March 2026, Tucson, AZ)
- **Invited talk** at the [ITU AI for Good webinar](https://aiforgood.itu.int/event/mapping-connectivity-for-saving-lives-the-early-warning-connectivity-map-ewcm/) — *Mapping Connectivity for Saving Lives: The Early Warning Connectivity Map (EWCM)* (January 2026, online)
