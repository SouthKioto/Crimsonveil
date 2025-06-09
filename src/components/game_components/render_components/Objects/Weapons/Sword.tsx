import Phaser from "phaser";
import { Weapon } from "./Weapon";

export class Sword extends Weapon {
  public sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(texture); // typ
    this.sprite = scene.physics.add.sprite(x, y, texture);

    //this._damage_multi = 1.6;
  }

  swing() {
    console.log("Sword swing");
  }
}
