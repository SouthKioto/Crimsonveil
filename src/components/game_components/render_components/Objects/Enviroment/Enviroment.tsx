import { generate_trees } from "../../game_elements/generate_trees";
import { Tree } from "./Tree";
import Phaser from "phaser";

export class Enviroment {
  private WORLD_SEED;
  private chunkSize: number;
  private tileSize: number;
  private scene: Phaser.Scene;
  private x: number;
  private y: number;
  private isLoaded: boolean;
  private enviroment;
  private noice;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    chunkSize: number,
    tileSize: number,
    WORLD_SEED: any,
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.WORLD_SEED = WORLD_SEED;
    this.chunkSize = chunkSize;
    this.tileSize = tileSize;

    this.noice = this.scene.rexPerlin.add(this.WORLD_SEED);
    this.enviroment = this.scene.add.group();
    this.isLoaded = false;
  }

  private seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  private shouldPlaceTree(worldX: number, worldY: number): boolean {
    const tileSeed =
      this.WORLD_SEED + Math.floor(worldX * 2) + Math.floor(worldY / 2);
    const rand = this.seededRandom(tileSeed);
    const noiseValue = this.noice.perlin2(worldX / 10, worldY / 10);

    const threshold = 0.4;
    return rand * noiseValue > threshold;
  }

  destroy(): void {
    if (this.isLoaded) {
      this.enviroment.clear(true, true);
      this.isLoaded = false;
    }
  }

  load(): void {
    if (!this.isLoaded) {
      generate_trees(
        this.scene,
        5,
        this.chunkSize,
        this.tileSize,
        this.x,
        this.y,
      );

      this.isLoaded = true;
    }
  }
}
