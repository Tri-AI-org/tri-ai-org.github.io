---
title: "Three Weeks In: How Cohort 10 Learned to Think Like a Language Model"
date: 2026-07-24
division: teaching
excerpt: A progress diary from the TRI AI Saturdays organising team
cover: /uploads/img_20260711_131502_202-compressed.pdf.png
draft: false
---
When we opened registration for Cohort 10 of TRI AI Saturdays, we did not expect to see **3,134 people from 83 countries** sign up for a free, 16-week deep dive into how language models actually work. Eighty-three percent of that number is from Africa, proof that the hunger to understand AI from the inside out, not just use it from the outside, is very real on this continent.

This cohort is special for another reason: it is powered by the **Google DeepMind AI Research Foundations course**, taking learners on a journey from the very first principles of language modelling all the way to training their own Small Language Model (SLM).

This post is our diary entry for that first leg: **Course 1, "Foundations of Language Modeling," covering Weeks 1 to 3.**

## **Week 0: Before the First Lecture, a Welcome**

Every good journey needs a proper send-off, and ours started on May 31 with an onboarding session hosted by Jesuyanmife Egbewale and Adetola Adetunji. It wasn't a lecture yet, it was a welcome. Using live polls on Slido, we asked participants where they were joining from (answers poured in from Nigeria, India, Uganda, Kenya, Canada, Ethiopia and beyond), how they were feeling about the 16 weeks ahead, and what one AI-solvable problem they'd fix in Africa tomorrow. The answers ranged from poverty and unemployment to electricity and healthcare; a good reminder of *why* this cohort exists in the first place.

We walked everyone through the logistics that would carry them through the cohort: Saturday lectures, Wednesday labs, the 60% attendance requirement for certification, the small language model training milestone, and the four cohort challenges. We also introduced the values we wanted the community to hold onto — curiosity, respect, collaboration, and consistency — because a cohort this size only works if people show up for each other, not just for the content.

By the time the session closed, teams were being planned, calendars were being synced, and the first attendance form was set to open that Saturday. Course 1 was about to begin.

## **Week 1: What Does It Mean for a Machine to "Understand" Language?**

**Lecture — Tejumade Afonja, PhD Researcher at CISPA & Programme Director, TRI AI**

Our first real class landed on June 6, and Tejumade opened Cohort 10 the way any good teacher opens a big topic; by grounding it in something everyone already understands: human language itself. She reminded the class that roughly 40% of the world's estimated 7,000 languages are spoken right here on the African continent, a fact that quietly set the tone for the entire cohort: this is not a course about AI happening *elsewhere*, it's a course being built *with* the languages and realities of this continent in mind.

From there, Tejumade broke down the fundamentals of natural language processing; syntax, semantics, and the way meaning depends on context, before connecting these ideas to how tools like ChatGPT and Claude actually work: by learning patterns from enormous amounts of text and predicting, one token at a time, what comes next. Participants shared their own everyday brushes with NLP, from grammar checkers to translation apps to image generation, which made an abstract topic feel immediately familiar.

The session also didn't shy away from limitations; hallucinations, security risks, and the importance of not outsourcing critical thinking to a model. Then came the maths: a hands-on walk through marginal, joint, and conditional probability, worked out live using a pass/fail dataset, ending with the class calculating that the probability of a failed student being female was 34.9%. It wasn't just theory, it was the exact kind of probabilistic thinking that sits underneath how language models predict the next word.

By the end of Week 1, 42% of participants had already completed the pre-work, and teams of up to 10 learners each — with two team leads apiece — had been assigned, ready to start collaborating.

## **Week 2: From Counting Words to Understanding Them — and the Ethics in Between**

**Lab — Tobias Lorenz, PhD Researcher at CISPA** **Lecture — Tobias Lorenz & Deborah Dormah Kanubala, PhD Researcher at Saarland University**

If Week 1 was about *why* language models matter, Week 2 was about *how* they're actually built — starting with the humble n-gram.

In Wednesday's lab, Tobias took nearly 300 live participants through building an n-gram model from scratch in Python, using the "Africa Galore" dataset as the working text corpus. Step by step, learners wrote code to slide a window across text, generate unigrams, bigrams, and trigrams, count their occurrences, and convert those counts into probabilities that could generate new text. It was refreshingly hands-on, the kind of session where you don't just hear about probability distributions, you build one yourself, bugs and all. True to the cohort's community spirit, when technical questions piled up, team members leaned on each other and on Discord to work through them together.

Saturday's lecture picked up exactly where the lab left off. Tobias pushed the class to see the ceiling of n-gram models: they cannot handle word combinations they've never seen, they only "remember" the last few words, and they fall apart the moment you ask them to generate something coherent at scale. This is where **transformers** entered the story. Tobias introduced embeddings — the idea that words can be represented as vectors capturing semantic meaning — and the attention mechanism, which lets a model look at *all* relevant context rather than just the last couple of words. It was the moment the curriculum's real destination came into view: everything from here builds toward the transformer architecture models like Gemma are built on.

Then the lecture took a turn that made Cohort 10 feel different from a typical technical bootcamp. Deborah Dormah Kanubala took over to lead an ethics discussion built around a localized trolley problem, the classic thought experiment, but reframed with scenarios involving pregnancy, age, corruption, and family, forcing participants to notice how their own cultural values shaped their answers. She introduced **Ubuntu** and **Sankofa** as African ethical frameworks and asked a question that stuck with a lot of us on the team: *whose values get encoded when we build AI, and whose get left out?* Participants picked a personal or community value — honesty, trust, interconnectedness came up again and again — and explored how it might shape the behaviour of a language model. It was a strong reminder that this cohort isn't just teaching people to build models; it's teaching people to build them *responsibly*, with an African lens that's too often missing from global AI conversations.

## **Week 3: Watching a Model Learn, Line by Line**

**Lab & Lecture — Oduguwa Damilola, ML Engineer at Bluechip**

By Week 3, the cohort had all the ingredients — tokens, probabilities, n-grams, embeddings — and it was time to put them together and actually **train something**.

Wednesday's lab, led by Damilola, was where the abstract finally became concrete. Participants built a tokenizer from scratch, learned why simple space-based splitting breaks down for things like code (where indentation carries meaning), and worked through a very relatable debugging moment: a bug where nested lists were created instead of flat token lists — the kind of thing every learner runs into on their way to understanding data preprocessing properly. From there, the class built a vocabulary, wrote encode and decode functions to move between words and numbers, and tackled **padding** — making sure every sentence in a dataset is the same length so the underlying maths (matrix operations) actually works. Then came the payoff: using TensorFlow and Keras, participants trained a real, working small language model and watched it generate text using both greedy and random sampling.

Saturday's lecture zoomed out from code to concepts. Damilola, introducing himself as an AI/ML engineer, walked the class through what training actually *is* — a model starting out as random noise and gradually adjusting its internal parameters to minimize error, much like a person practising a skill. He unpacked the difference between **supervised fine-tuning** and **reinforcement learning with human feedback**, clarified how fine-tuning differs from Retrieval-Augmented Generation (RAG), and introduced the trio every ML practitioner needs: evaluation criteria (what to measure), metrics (how to measure it), and benchmarks (the standard you're measured against) — comparing a benchmark to an exam a model is tested on, never trained on. He closed with an honest look at deployment: a low training loss doesn't mean a model is safe or useful in the real world, and monitoring for drift and failure after launch matters just as much as training did in the first place.

With that, Damilola confirmed what the whole team already felt: **Course 1 was complete.**

## **Where We Stand After Three Weeks**

Three weeks, three instructors, one ethics session that will stay with a lot of participants, and one working small language model trained by hundreds of hands across 83 countries. That's Course 1.

Along the way, our organising team was doing what happens behind every "smooth" cohort session — debugging leaderboard sign-ins, fixing Discord permissions, running office hours for anyone catching up on Python prerequisites, and reshuffling teams to keep participation healthy ahead of project work. None of that shows up in a curriculum outline, but it's the scaffolding that made three weeks of learning actually land for thousands of people.

Course 1 also closes with the **first cohort challenge** — developing a problem statement — due by Week 7, and the individual Skills Boost challenge lab for Course 1 due by Week 14. Both are now open, and teams are starting to think about the projects they'll carry all the way to Demo Day.

Next up: **Course 2 — Text Data: Tokenization & Embeddings**, where the cohort will go deeper into preparing data, exploring subword tokenization, and building datasets ethically with data cards. If Course 1 taught the "why," Course 2 is where the "how" gets sharper.

We'll be back with the next diary entry of Course 2’s wrap-up. Until then, to every learner who showed up on a Saturday morning, debugged a stubborn line of Python, or sat through an ethics conversation that challenged how they think about AI: thank you for building this with us.

*— The TRI AI Saturdays Cohort 10 Organising Team*

**Israel Ekundayo, Programme Volunteer**
