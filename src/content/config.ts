// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const docsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        order: z.number(),
        xref: z.string().optional(),
        title: z.string(),
        description: z.string(),
        redirectFrom: z.union([z.string(), z.array(z.string())]).optional(),
        showInSidebar: z.boolean().optional().default(true),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'docs': docsCollection
};
