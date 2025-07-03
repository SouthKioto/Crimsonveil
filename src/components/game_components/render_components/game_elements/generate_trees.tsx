import { Tree } from "../Objects/Enviroment/Tree";

export const generate_trees = (
  scene: Phaser.Scene,
  countStructures: number,
  chunkSize: number,
  tileSize: number,
  positionX: number,
  positionY: number,
) => {
  const treeWidth = 64;
  const treeHeight = 112;
  let tree: Tree;

  const placedTrees: { x: number; y: number }[] = [];

  for (let localY = 0; localY < chunkSize; localY++) {
    for (let localX = 0; localX < chunkSize; localX++) {
      const worldTileX = positionX * chunkSize + localX;
      const worldTileY = positionY * chunkSize + localY;

      const pixelX = worldTileX * tileSize;
      const pixelY = worldTileY * tileSize;

      const randomTreeStage = Math.floor(Math.random() * 16);

      if ([0, 1, 4, 5, 8, 9, 12, 13].includes(randomTreeStage)) {
        continue;
      }

      const overlaps = placedTrees.some((tree) => {
        const dx = Math.abs(tree.x - pixelX);
        const dy = Math.abs(tree.y - pixelY);
        return dx < treeWidth && dy < treeHeight;
      });

      if (overlaps) continue;

      tree = new Tree(scene, pixelX, pixelY, randomTreeStage);

      placedTrees.push({ x: pixelX, y: pixelY });
    }
  }
};
