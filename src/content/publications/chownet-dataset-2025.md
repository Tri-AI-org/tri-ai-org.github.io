---
title: "ChowNet: An Image Dataset of Nigerian Food"
date: 2024-09-03
authors:
  - Tejumade Afonja
  - Igwegbe George
venue: arXiv preprint
division: research
attribution: tri-led
project: ChowNet
attribution: tri-led
abstract: Off-the-shelf food recognition models perform poorly on Nigerian
  cuisine, limiting their usefulness for nutrition tracking, agricultural
  research, and consumer applications in the region. We present ChowNet V1, a
  dataset of 118 human-annotated images of Nigerian food spanning 99 unique
  labels, distributed in COCO, YOLO, and CSV formats and curated to support
  multi-label classification, food object detection, food clustering, and food
  captioning. The dataset was gathered by the AI Saturdays Lagos community in
  2018 from 568 initial submissions across 15 categories, then reduced through a
  multi-stage cleaning process including CLIP-based duplicate detection, blur
  filtering, privacy review, and copyright compliance checks. ChowNet V1 is
  released under CC-BY 4.0 and is intended as a foundation for benchmarking food
  vision models on underrepresented cuisines, with the community welcoming
  contributions of additional regional cuisines.
datasetUrl: https://zenodo.org/records/13633554
codeUrl: https://github.com/AISaturdaysLagos/chownet
featured: true
draft: false
---
### Motivation
 
Food recognition models have largely been built on datasets that do not reflect the diversity of global cuisines, and Nigerian food in particular has been poorly classified by off-the-shelf object detection models. That gap has real consequences as these models get embedded into nutrition tracking tools, agricultural research, and consumer applications. ChowNet was created by the AI Saturdays Lagos community to bring Nigerian food into the computer vision landscape.
 
### Dataset
 
**ChowNet V1** contains **118 human-annotated food images** spanning **99 unique labels**, curated for multi-label classification, food object detection, food clustering, and food captioning. The dataset is distributed in multiple formats including COCO, YOLO, and CSV, making it straightforward to plug into existing vision pipelines.
 
Annotation was led by **Tejumade Afonja** (Helmholtz Center for Information Security), **George Igwegbe** (Carnegie Mellon University Africa), and **Peace Ijeoma Nwafor**, with contributions from nine project members across the broader AI Saturdays Lagos community.
 
### How the dataset was built
 
The community collected **568 images across 15 categories in 2018** using three parallel approaches: an Android app for capture and tagging, a GitHub-based submission flow, and a shared Google Drive folder. Each approach surfaced different trade-offs around scalability and sustainability.
 
Before publishing, the team applied a substantial cleaning pass that reduced the dataset to 118 high-quality images:
 
* **Duplicate removal** using CLIP with a similarity threshold above 90%, followed by manual inspection
* **Quality filtering** to exclude blurry images
* **Privacy review** to remove images containing visible body parts such as hands
* **Copyright compliance** checks using Google Image Lens to remove copyrighted images
* **Resolution considerations**, deliberately retaining some lower-resolution images so the dataset reflects realistic camera conditions
### Supported tasks
 
The dataset is curated to support:
 
* Multi-label classification
* Food object detection
* Food clustering
* Food captioning
The 99-label taxonomy provides enough granularity to expose meaningful performance differences between general-purpose vision models and food-specialised ones.
 
### Open release
 
The data was gathered by the community in 2018 and formally published on Zenodo on **September 3, 2024** under a **Creative Commons Attribution 4.0 International (CC-BY 4.0)** license. The repository is openly available on GitHub, and the community welcomes contributions of additional regional cuisines and feedback on annotation conventions.
 
### How to cite
 
Please cite via the Zenodo DOI: [10.5281/zenodo.13633554](https://doi.org/10.5281/zenodo.13633554).
 
