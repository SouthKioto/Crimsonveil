export const generate_chunks = (
  scene: Phaser.Scene,
  positionX: number,
  positionY: number,
  chunkSize: number,
) => {
  const startX = positionX * chunkSize;
  const startY = positionY * chunkSize;

  for (let x = 0; x < chunkSize; x += 32) {
    for (let y = 0; y < chunkSize; y += 32) {
      let tile = scene.add.rectangle(startX + x, startY + y, 32, 32, 0x666666);
      scene.physics.add.existing(tile, true);
    }
  }
};
