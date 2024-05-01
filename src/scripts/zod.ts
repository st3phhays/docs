import * as z from 'zod';

const DocDataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export type DocData = z.infer<typeof DocDataSchema>;

const DocChildrenSchema = z.object({
  slug: z.string(),
  data: DocDataSchema,
  children: z.array(z.lazy(() => DocChildrenSchema)).optional(),
});

export type DocChildren = z.infer<typeof DocChildrenSchema>;

const DocItemSchema = DocChildrenSchema;

export type DocItem = z.infer<typeof DocItemSchema>;

const DocFormattedSchema = z.array(DocItemSchema);

export type DocFormatted = z.infer<typeof DocFormattedSchema>;
