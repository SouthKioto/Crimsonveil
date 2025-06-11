import { Perlin } from "phaser3-rex-plugins/plugins/perlin";
import { Tile } from "./Tile";
import { generate_frogs } from "../../game_elements/generate_frogs";
import { generate_trees } from "../../game_elements/generate_trees";

export class Chunk {
  private scene: Phaser.Scene;
  private x: number;
  private y: number;
  protected tileSize: number;
  protected chunkSize: number;
  private tiles;
  private isLoaded: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    tileSize: number,
    chunkSize: number,
  ) {
    this.scene = scene;
    this.tileSize = tileSize;
    this.chunkSize = chunkSize;
    this.x = x;
    this.y = y;

    this.tiles = this.scene.add.group();
    this.isLoaded = false;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  unload(): void {
    if (this.isLoaded) {
      this.tiles.clear(true, true);
      this.isLoaded = false;
    }
  }

  load() {
    if (!this.isLoaded) {
      let grassPositions: { x: number; y: number }[] = [];

      for (var x = 0; x < this.chunkSize; x++) {
        for (var y = 0; y < this.chunkSize; y++) {
          var tileX =
            this.x * (this.chunkSize * this.tileSize) + x * this.tileSize;

          var tileY =
            this.y * (this.chunkSize * this.tileSize) + y * this.tileSize;

          const noice = this.scene.rexPerlin.add(921381293128);
          var perlinValue = noice.perlin2(tileX / 300, tileY / 300);

          var key = "";
          var animationKey = "";

          if (perlinValue < 0.2) {
            key = "sprGrass";
            grassPositions.push({ x: tileX, y: tileY });
          } else if (perlinValue >= 0.2 && perlinValue < 0.4) {
            key = "sprSand";
          } else if (perlinValue >= 0.4) {
            key = "sprWater";
            animationKey = "sprWater";
          }

          var tile = new Tile(this.scene, tileX, tileY, key);

          if (animationKey !== "") {
            tile.play(animationKey);
          }

          this.tiles.add(tile);
        }
      }

      if (grassPositions.length > 0) {
        generate_trees(this.scene, 1, grassPositions);
      }

      this.isLoaded = true;
    }
  }
}
