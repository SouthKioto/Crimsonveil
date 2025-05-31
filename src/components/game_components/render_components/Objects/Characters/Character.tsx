import Phaser from "phaser";


export class Character extends Phaser.Physics.Arcade.Sprite {
  protected _health = 100;
  protected _damage = 10;
  protected _movementSpeed = 10;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)

    scene.add.existing(this);
    scene.physics.add.existing(this)

  }

  public getDamage(value?: number): void {

    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onStart: () => {
        if (value) {
          this._health = this._health - value;
        }
      },
      onComplete: () => {
        console.log("Postac zginela");
      }
    })
  }
}

