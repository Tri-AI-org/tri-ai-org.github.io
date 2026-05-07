import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    authors: z.array(z.string()),
    venue: z.string().optional(),
    division: z.enum(['research', 'teaching', 'innovation']).default('research'),
    project: z.string().optional(),
    abstract: z.string(),
    pdfUrl: z.string().optional(),         // accepts /uploads/... or full URL
    externalUrl: z.string().url().optional(),
    datasetUrl: z.string().url().optional(),  // e.g. Zenodo
    codeUrl: z.string().url().optional(),     // e.g. GitHub
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

/**
 * `programmes` is the master entity for any divisional activity:
 *  - kind: 'cohort'        — multi-week structured cohorts (e.g. AI Saturdays)
 *  - kind: 'course'        — partner-delivered curricula (e.g. AI Foundations w/ DeepMind)
 *  - kind: 'watch-party'   — group viewings of conference talks / discussions
 *  - kind: 'colloquium'    — invited speaker series, expert talks
 *  - kind: 'research-init' — long-running research projects (e.g. Sauti, ChowNet)
 *  - kind: 'lab'           — applied / innovation labs (future)
 */
const programmes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programmes' }),
  schema: z.object({
    title: z.string(),
    division: z.enum(['teaching', 'research', 'innovation']),
    kind: z.enum(['cohort', 'course', 'watch-party', 'colloquium', 'research-init', 'lab']).default('cohort'),
    tagline: z.string(),
    description: z.string(),
    status: z.enum(['active', 'upcoming', 'archived']).default('active'),
    cover: z.string().optional(),
    location: z.string().optional(),
    cohortInfo: z.string().optional(),  // e.g. "Cohort 9 — applications open"
    cadence: z.string().optional(),     // e.g. "Quarterly", "Monthly", "Weekly"
    partner: z.string().optional(),     // e.g. "Google DeepMind" for courses
    applyUrl: z.string().optional(),       // url, mailto:, or internal /apply path
    githubUrl: z.string().url().optional(),
    websiteUrl: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

/**
 * `cohorts` — historical record of completed cohorts.
 * Used by AI Saturdays Lagos archive page.
 */
const cohorts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cohorts' }),
  schema: z.object({
    programme: z.string(),  // matches programmes.id slug, e.g. "tri-ai-saturdays"
    number: z.number(),     // cohort number, e.g. 7
    year: z.number(),
    title: z.string().optional(),  // optional theme/name
    learners: z.number().optional(),
    projectsUrl: z.string().url().optional(),
    blogUrl: z.string().url().optional(),
    photoUrl: z.string().optional(),       // internal /uploads/... or external Google Photos link
    summary: z.string(),
    status: z.enum(['completed', 'running', 'upcoming']).default('completed'),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    track: z.string(),
    partner: z.string().optional(),
    cover: z.string().optional(),
    summary: z.string(),
    duration: z.string().optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    enrollUrl: z.string().optional(),
    order: z.number().default(0),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    affiliation: z.string().optional(),
    photo: z.string().optional(),
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    division: z.enum(['parent', 'teaching', 'research', 'innovation']).default('parent'),
    group: z.enum(['board', 'leadership', 'team']).default('team'),
    order: z.number().default(0),
  }),
});

const partners = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/partners' }),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    url: z.string().url().optional(),
    tier: z.enum(['lead', 'partner', 'supporter']).default('partner'),
    order: z.number().default(0),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    division: z.enum(['parent', 'teaching', 'research', 'innovation']).default('parent'),
    excerpt: z.string(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

/**
 * `press` — third-party mentions, articles, talks, podcasts.
 * Lives on a /press page; pure outbound links.
 */
const press = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/press' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    outlet: z.string(),               // e.g. "Fast Company", "Deep Learning Indaba"
    kind: z.enum(['article', 'talk', 'podcast', 'paper-citation', 'mention']).default('article'),
    url: z.string().url(),
    excerpt: z.string().optional(),
    division: z.enum(['parent', 'teaching', 'research', 'innovation']).default('parent'),
    project: z.string().optional(),   // e.g. "Sauti Project", "ChowNet"
    order: z.number().default(0),
  }),
});

export const collections = { publications, programmes, cohorts, courses, team, partners, news, press };
