import { getWidth, getHeight } from "../utils/max_width_and_height"
import { Tree } from "../Objects/Tree"


export const generate_trees = (countStructures: number, scene) => {

  let tree;

  const treeWidth = 64;
  const treeHeight = 112;

  const placedTrees: { x: number, y: number }[] = [];

  for (let i = 1; i <= countStructures; i++) {
    let randomX = Math.random() * getWidth();
    let randomY = Math.random() * getHeight();

    let randomTreeStage = Math.floor(Math.random() * 16);

    if ([0, 1, 4, 5, 8, 9, 12, 13].includes(randomTreeStage)) {
      i--;
      continue;

    }

    const overlaps = placedTrees.some(tree => {
      const dx = Math.abs(tree.x - randomX);
      const dy = Math.abs(tree.y - randomY);
      return dx < treeWidth && dy < treeHeight;
    });

    if (overlaps) continue;

    tree = new Tree(scene, randomX, randomY, randomTreeStage);
    scene.physics.add.existing(tree)
    scene.add.existing(tree);

    tree.setScale(2)
    tree.setSize(10, -50);
    tree.setOffset(27, 95)
    placedTrees.push({ x: randomX, y: randomY });

  }
}
