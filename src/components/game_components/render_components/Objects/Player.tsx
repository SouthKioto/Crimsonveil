import Phaser from "phaser";

enum HealthState {
  IDLE,
  DAMAGE,
  DEAD
}

export class Player extends Phaser.Physics.Arcade.Sprite {

  private healthState = HealthState.IDLE;

  private _health = 100;
  private _damage = 10;

  get health() {
    return this._health;
  }

  get damage() {
    return this._damage;
  }

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
  }
}
