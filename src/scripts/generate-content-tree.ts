// @ts-nocheck
import { getCollection } from 'astro:content';
import { contentTreeSchema } from '@scripts/types'
import type { ContentTree, ContentTreeBase } from '@scripts/types';

export const generateContentTree = async (parentSlug = ""): Promise<ContentTree[]> => {
    const docsEntries = await getCollection('docs', ({ data }) => {
        delete data.redirectFrom;
        delete data.ogImage;
        delete data.twitterImage;

        return data;
    });

    const map: ContentTreeBase = {};
    const result: ContentTree[] = [];

    // Sort by `order` in frontmatter
    const sortedDocs = docsEntries.sort((a, b) => a.data.order - b.data.order);

    sortedDocs.forEach(item => {
        item.body = '';

        map[item.slug] = { ...item, children: [] };
    });

    sortedDocs.forEach(item => {
        if (item.slug !== parentSlug) {
            const parent = map[item.slug.split('/').slice(0, -1).join('/')];

            if (parent) {
                parent.children.push(map[item.slug]);
            } else {
                result.push(map[item.slug]);
            }
        }
    });

    const addDepthToTree = (tree: ContentTree[], depth = 0): ContentTree[] => {
        return tree.map(node => {
            const newNode = {
                ...node,
                data: {
                    ...node.data,
                    depth
                }
            };

            if (node.children && node.children.length > 0) {
                newNode.slug = `/${newNode.slug}/`;
                newNode.children = addDepthToTree(node.children, depth + 1);
            } else {
                newNode.slug = `/${newNode.slug}`;
            }

            return newNode;
        });
    };

    const treeWithDepths = addDepthToTree(result);

    // Ensure the tree is valid
    contentTreeSchema.parse(treeWithDepths[0]);

    return treeWithDepths;
};
