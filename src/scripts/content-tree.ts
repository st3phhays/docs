import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

const docsEntries = await getCollection('docs', ({ data }) => {
    delete data.redirectFrom;
    delete data.xref;
    delete data.ogImage;
    delete data.twitterImage;

    return data.showInSidebar !== false;
});

const transformData = (data: CollectionEntry<'docs'>, parentSlug = "", level = 0) => {
    const map = {};
    const result: [] = [];

    // Sort by `order` in frontmatter
    const sortedDocs = data.sort((a: { data: { order: number; }; }, b: { data: { order: number; }; }) => a.data.order - b.data.order);

    sortedDocs.forEach((item: CollectionEntry<'docs'>) => {
        item.body = '';
        // item.data.level = level; // Add the level property here

        map[item.slug] = { ...item, children: [] };
    });

    sortedDocs.forEach((item: CollectionEntry<'docs'>) => {
        if (item.slug !== parentSlug) {
            const parent = map[item.slug.split('/').slice(0, -1).join('/')];
            if (parent) {
                parent.children.push(map[item.slug]);
            } else {
                result.push(map[item.slug]);
            }
        }
    });

    const addLevelToTree = (tree, level = 0) => {
        return tree.map(node => {
            const newNode = { ...node, data: { ...node.data, level } };
            if (node.children && node.children.length > 0) {
                newNode.children = addLevelToTree(node.children, level + 1);
            }
            return newNode;
        });
    };

    const treeWithLevels = addLevelToTree(result);
    
    return treeWithLevels;
};

export const contentTree = transformData(docsEntries);
