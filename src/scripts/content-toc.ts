export const contentToc = headings => {
    const toc = [];
    const parentHeadings = new Map();

    headings.forEach((h) => {
        const heading = { ...h, subheadings: [] };
        parentHeadings.set(heading.depth, heading);
        // Change 2 to 1 if your markdown includes your <h1>
        if (heading.depth === 2) {
            toc.push(heading);
        } else {
            // Check if the parent heading exists before pushing
            const parentHeading = parentHeadings.get(heading.depth - 1);
            if (parentHeading) {
                parentHeading.subheadings.push(heading);
            }
        }
    });

    return toc;
}