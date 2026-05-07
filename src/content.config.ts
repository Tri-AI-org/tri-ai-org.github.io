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
    project: z.string().optional(), // e.g. "Sauti Project"
    abstract: z.string(),
    pdfUrl: z.string().url().optional(),
    externalUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const programmes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programmes' }),
  schema: z.object({
    title: z.string(),
    division: z.enum(['teaching', 'research', 'innovation']),
    tagline: z.string(),
    description: z.string(),
    status: z.enum(['active', 'upcoming', 'archived']).default('active'),
    cover: z.string().optional(),
    location: z.string().optional(),
    cohortInfo: z.string().optional(),
    applyUrl: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    track: z.string(), // e.g. "AI Foundations", "Machine Learning"
    partner: z.string().optional(), // e.g. "Google DeepMind"
    cover: z.string().optional(),
    summary: z.string(),
    duration: z.string().optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    enrollUrl: z.string().url().optional(),
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

export const collections = { publications, programmes, courses, team, partners, news };
