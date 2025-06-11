import { Tree } from "../Objects/Environment/Tree";

export const generate_trees = (
  scene: Phaser.Scene,
  countStructures: number,
  grassPositions: { x: number; y: number }[],
) => {
  const treeWidth = 64;
  const treeHeight = 112;

  const placedTrees: { x: number; y: number }[] = [];

  let attempts = 0;
  let treesPlaced = 0;

  while (treesPlaced < countStructures && attempts < 1000) {
    attempts++;

    const pos =
      grassPositions[Math.floor(Math.random() * grassPositions.length)];

    let randomTreeStage = Math.floor(Math.random() * 16);

    if ([0, 1, 4, 5, 8, 9, 12, 13].includes(randomTreeStage)) {
      continue;
    }

    const overlaps = placedTrees.some((tree) => {
      const dx = Math.abs(tree.x - pos.x);
      const dy = Math.abs(tree.y - pos.y);
      return dx < treeWidth && dy < treeHeight;
    });

    if (overlaps) continue;

    const tree = new Tree(scene, pos.x, pos.y, randomTreeStage);

    placedTrees.push({ x: pos.x, y: pos.y });
    treesPlaced++;
  }
};
