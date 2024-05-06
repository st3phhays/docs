import { generateContentTree } from '@scripts/generate-content-tree';
import type { ContentTree } from '@scripts/types';

export const constructFlatMap = async (): Promise<{ [key: string]: string }[]> => {
    const contentTree = await generateContentTree();
    const flatMap: { [key: string]: string }[] = [];

    const traverseTree = (node: ContentTree) => {
        flatMap.push({ [node.data.xref]: node.slug });
        node.children.forEach(traverseTree);
    };

    contentTree.forEach(traverseTree);

    return flatMap;
};

export const xref = async (key: string, anchor: string | null = null): Promise<string> => {
    const xrefs = await constructFlatMap();

    const result = xrefs.find(item => key in item);

    if (result) {
        const link = anchor ? `${result[key]}#${anchor}` : `${result[key]}`;

        return link;
    }

    return '#';
};
