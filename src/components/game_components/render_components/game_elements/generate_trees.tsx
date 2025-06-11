import { Tree } from "../Objects/Environment/Tree";

export const generate_trees = (
  scene: Phaser.Scene,
  countStructuresPerChunk: number,
  chunkSize: number,
  chunkPositions: { x: number; y: number }[],
) => {
  const treeWidth = 64;
  const treeHeight = 112;

  const placedTrees: { x: number; y: number }[] = [];

  console.log(chunkPositions);

  for (const chunk of chunkPositions) {
    let treesInChunk = 0;

    while (treesInChunk < countStructuresPerChunk) {
      let randomX = chunk.x + Math.random() * chunkSize;
      let randomY = chunk.y + Math.random() * chunkSize;

      let randomTreeStage = Math.floor(Math.random() * 16);

      // Skip certain stages
      if ([0, 1, 4, 5, 8, 9, 12, 13].includes(randomTreeStage)) {
        continue;
      }

      const overlaps = placedTrees.some((tree) => {
        const dx = Math.abs(tree.x - randomX);
        const dy = Math.abs(tree.y - randomY);
        return dx < treeWidth && dy < treeHeight;
      });

      if (overlaps) continue;

      const tree = new Tree(scene, randomX, randomY, randomTreeStage);
      scene.physics.add.existing(tree);
      scene.add.existing(tree);

      tree.setScale(2);
      tree.setSize(10, -20);
      tree.setOffset(27, 95);

      placedTrees.push({ x: randomX, y: randomY });
      treesInChunk++;
    }
  }
};
