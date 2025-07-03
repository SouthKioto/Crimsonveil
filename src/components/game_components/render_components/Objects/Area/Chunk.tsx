import { Perlin } from "phaser3-rex-plugins/plugins/perlin";
import { Tile } from "./Tile";
import { Enviroment } from "../Enviroment/Enviroment";

export class Chunk {
  private scene: Phaser.Scene;
  private x: number;
  private y: number;
  protected world_seed;
  protected tileSize: number;
  protected chunkSize: number;
  private tiles;
  private isLoaded: boolean;

  private enviroment: Enviroment;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    tileSize: number,
    chunkSize: number,
    world_seed: any,
  ) {
    this.scene = scene;
    this.tileSize = tileSize;
    this.chunkSize = chunkSize;
    this.world_seed = world_seed;
    this.x = x;
    this.y = y;

    this.tiles = this.scene.add.group();
    this.enviroment = new Enviroment(
      scene,
      x,
      y,
      chunkSize,
      tileSize,
      world_seed,
    );
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
      this.enviroment.destroy();
      this.isLoaded = false;
    }
  }

  load(): void {
    let isGrass = false;
    if (!this.isLoaded) {
      for (let x = 0; x < this.chunkSize; x++) {
        for (let y = 0; y < this.chunkSize; y++) {
          const tileX =
            this.x * (this.chunkSize * this.tileSize) + x * this.tileSize;

          const tileY =
            this.y * (this.chunkSize * this.tileSize) + y * this.tileSize;

          const noise = this.scene.rexPerlin.add(this.world_seed);
          const perlinValue = noise.perlin2(tileX / 1000, tileY / 1000);

          let key = "";
          let animationKey = "";

          if (perlinValue < 0.2) {
            key = "sprGrass";
            isGrass = true;
          } else if (perlinValue >= 0.2 && perlinValue < 0.3) {
            key = "sprSand";
          } else {
            key = "sprWater";
            animationKey = "sprWater";
          }

          const tile = new Tile(this.scene, tileX, tileY, key);
          if (animationKey !== "") {
            tile.play(animationKey);
          }

          this.tiles.add(tile);
        }
      }

      this.enviroment.load();

      this.isLoaded = true;
    }
  }
}
