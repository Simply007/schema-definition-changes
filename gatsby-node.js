exports.onCreateNode = (api) => {
  const { node, actions: { createNodeField } } = api;
  if (node.internal.type === "KontentItemBeltPitch") {
    // Edit in case of multiple items in usedByContentItems
    const linkedNode = api.getNode(node.usedByContentItems___NODE[0]) || false;
    const beltTypeNode = api.getNode(node.elements.belt_type.linked_items___NODE[0]) || '';

    createNodeField({
      node,
      name: `isUsedInBeltSeries`,
      value: linkedNode && linkedNode.system.type === 'belt_series'
    });

    createNodeField({
      node,
      name: `beltTypeUrlSlug`,
      // Decide whether the automatic JS SDK URL resolution is used
      value: beltTypeNode && beltTypeNode.elements.url_slug.value // beltTypeNode.elements.url_slug.resolvedUrl
    });
  }
};