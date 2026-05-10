---
title: "Learning Nigerian accent embeddings from speech: preliminary results
  based on SautiDB-Naija corpus"
date: 2021-12-12
authors:
  - Tejumade Afonja
  - Oladimeji Mudele
  - Iroro Orife
  - Kenechi Dukor
  - Lawrence Francis
  - Duru Goodness
  - Oluwafemi Azeez
  - Ademola Malomo
  - Clinton Mbataku
venue: Proceedings of the African NLP Workshop
division: research
project: Sauti Project
abstract: "This paper describes foundational efforts with SautiDB-Naija, a novel
  corpus of non-native (L2) Nigerian English speech. We describe how the corpus
  was created and curated as well as preliminary experiments with accent
  classification and learning Nigerian accent embeddings. The initial version of
  the corpus includes over 900 recordings from L2 English speakers of Nigerian
  languages, such as Yoruba, Igbo, Edo, Efik-Ibibio, and Igala. We further
  demonstrate how fine-tuning on a pre-trained model like wav2vec can yield
  representations suitable for related speech tasks such as accent
  classification. SautiDB-Naija has been published to Zenodo for general use
  under a flexible Creative Commons License. "
externalUrl: https://arxiv.org/abs/2112.06199
datasetUrl: https://zenodo.org/records/4561842
featured: true
draft: false
---
## Background

Online education and global communication increasingly rely on English, yet non-native speakers face significant cognitive burdens when encountering unfamiliar accents. Nigerian English, spoken across dozens of distinct linguistic communities, has been largely absent from accented speech research. This paper introduces SautiDB-Naija to begin addressing that gap.

## Contributions

* A curated corpus of 919 non-native English speech recordings from speakers of Yorùbá, Ìgbò, Ẹdó, Efik-Ibibio, and Igala. 
* SautiClassify, an accent classification system using wav2vec embeddings combined with a GRU-based encoder. 
* A publicly available dataset released on Zenodo under a Creative Commons License.

## Findings

Fine-tuning a pretrained wav2vec model with batch normalization achieved the best classification accuracy at 69.5% and an F1-score of 0.65, more than doubling the baseline performance. Embedding visualizations showed that accents cluster meaningfully in latent space, with Yorùbá and Ẹdó appearing closer to each other than to Ìgbò, which reflects their historically overlapping ethnic backgrounds.

## Future work

Our authors plan to expand and diversify the SautiDB-Naija corpus and begin research into L2 accent conversion tasks, with the broader goal of allowing online video content to be delivered to learners in a more familiar accent.
