import { Chunk } from "../Objects/Area/Chunk";
import { Player } from "../Objects/Characters/Player";

const chunks: Chunk[] = [];

const getChunk = (x: number, y: number): Chunk | null => {
  var chunk = null;
  for (var i = 0; i < chunks.length; i++) {
    if (chunks[i].getX() == x && chunks[i].getY() == y) {
      chunk = chunks[i];
    }
  }
  return chunk;
};

export const generate_chunks = (
  scene: Phaser.Scene,
  chunkSize: number,
  tileSize: number,
  player: Player,
  world_seed: any,
) => {
  var snappedChunkX =
    chunkSize * tileSize * Math.round(player.x / (chunkSize * tileSize));

  var snappedChunkY =
    chunkSize * tileSize * Math.round(player.y / (chunkSize * tileSize));

  snappedChunkX = snappedChunkX / chunkSize / tileSize;
  snappedChunkY = snappedChunkY / chunkSize / tileSize;

  for (var x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
    for (var y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
      var existingChunk = getChunk(x, y);

      if (existingChunk == null) {
        var newChunk = new Chunk(scene, x, y, tileSize, chunkSize, world_seed);
        chunks.push(newChunk);
      }
    }
  }

  for (var i = 0; i < chunks.length; i++) {
    var chunk = chunks[i];

    if (
      Phaser.Math.Distance.Between(
        snappedChunkX,
        snappedChunkY,
        chunk.getX(),
        chunk.getY(),
      ) < 3
    ) {
      if (chunk !== null) {
        chunk.load();
      }
    } else {
      if (chunk !== null) {
        chunk.unload();
      }
    }
  }
};
