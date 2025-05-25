import Phaser from "phaser";

enum HealthState {
  IDLE,
  DAMAGE,
  DEAD
}

export class Player extends Phaser.Physics.Arcade.Sprite {

  private healthState = HealthState.IDLE;

  private _health = 100;

  get health() {
    return this._health;
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");
  }
}
