---
title: 'Towards Speech Recognition for Under-Resourced African Languages: A Sauti Project Benchmark'
date: 2026-02-14
authors:
  - Tejumade Afonja
  - Lawrence Francis
  - George Igwegbe
venue: Proceedings of the African NLP Workshop
division: research
project: Sauti Project
abstract: We introduce a new benchmark for speech recognition across five under-resourced African languages, alongside baseline results from contemporary self-supervised speech models. Our work highlights the gap between high-resource and low-resource performance and proposes evaluation protocols suited to the linguistic diversity of the continent.
externalUrl: https://arxiv.org/abs/2112.06199
datasetUrl: https://zenodo.org/records/4561842
featured: true
draft: false
---

## Background

Speech recognition has made dramatic progress on a small set of high-resource languages, but performance on the thousands of African languages spoken by hundreds of millions of people lags substantially. This paper introduces a benchmark intended to track that gap and accelerate its closing.

## Contributions

- A curated evaluation set spanning five African languages
- Baselines from current self-supervised speech models
- An evaluation protocol that accounts for tonal, agglutinative, and code-switched features common across the languages in scope

## Findings

Even the strongest current models lag substantially on the languages benchmarked, with per-language word-error rates ranging from acceptable to effectively unusable. We argue this points to data scarcity and modelling assumptions that travel poorly across language families.

## Future work

The benchmark is intended to be extended. Researchers and language-community contributors are encouraged to reach out about adding additional languages and evaluation tasks.
