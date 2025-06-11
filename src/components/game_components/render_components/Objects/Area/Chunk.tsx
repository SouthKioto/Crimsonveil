import { Perlin } from "phaser3-rex-plugins/plugins/perlin";
import { Tile } from "./Tile";

export class Chunk {
  private scene: Phaser.Scene;
  private x: number;
  private y: number;
  private tiles;
  private isLoaded: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.tiles = this.scene.add.group();
    this.isLoaded = false;
  }

  unload() {
    if (this.isLoaded) {
      this.tiles.clear(true, true);
      this.isLoaded = false;
    }
  }

  load() {
    if (!this.isLoaded) {
      for (var x = 0; x < this.scene.chunkSize; x++) {
        for (var y = 0; y < this.scene.chunkSize; y++) {
          var tileX =
            this.x * (this.scene.chunkSize * this.scene.tileSize) +
            x * this.scene.tileSize;

          var tileY =
            this.y * (this.scene.chunkSize * this.scene.tileSize) +
            y * this.scene.tileSize;

          const noice = this.scene.rexPerlin.add(921381293128);
          var perlinValue = noice.perlin2(tileX / 100, tileY / 100);

          var key = "";
          var animationKey = "";

          if (perlinValue < 0.2) {
            key = "sprGrass";
          } else if (perlinValue >= 0.2 && perlinValue < 0.3) {
            key = "sprSand";
          } else if (perlinValue >= 0.3) {
            key = "sprWater";
            animationKey = "sprWater";
          }

          var tile = new Tile(this.scene, tileX, tileY, key);

          console.log(animationKey);

          if (animationKey !== "") {
            tile.play(animationKey);
          }

          this.tiles.add(tile);
        }
      }

      this.isLoaded = true;
    }
  }
}
