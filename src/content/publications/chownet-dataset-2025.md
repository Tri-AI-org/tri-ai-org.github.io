---
title: 'ChowNet: A Diverse Image Dataset for African Cuisine Recognition'
date: 2025-11-08
authors:
  - Oluwafemi Azeez
  - Kenechi Dukor
  - Tejumade Afonja
venue: arXiv preprint
division: research
project: ChowNet
abstract: We present ChowNet, an image dataset and benchmark for recognising African cuisine. Existing food-recognition datasets contain little African food imagery, leaving downstream applications poorly suited to billions of meals. ChowNet establishes a baseline and a path forward.
datasetUrl: https://zenodo.org/records/13633554
codeUrl: https://github.com/AISaturdaysLagos/chownet
featured: false
draft: false
---

## Motivation

Food-recognition models trained on Western-centric datasets fail systematically on African cuisine. As these models propagate into nutrition tracking, agricultural research, and consumer products, the failure mode quietly excludes a continent's worth of meals from the systems built atop them.

## Dataset

ChowNet collects images across regional cuisines, with annotation guided by community contributors familiar with the dishes catalogued. Each image is labelled with the dish, region of origin, and key ingredients where identifiable.

## Baselines

We benchmark a suite of contemporary vision models — both general-purpose and food-specialised. The performance gap between general food-recognition tasks and ChowNet's task indicates substantial headroom for targeted research.

## Open release

The dataset is released for non-commercial research use. We invite contributions of additional regional cuisines and welcome feedback on annotation conventions.
