import Phaser, { Scene } from "phaser";

enum Direstions {
  UP,
  DOWN,
  RIGHT,
  LEFT,
}

const randomDirection = (dir: Direstions) => {
  let newDirection = Phaser.Math.Between(0, 3);

  while (newDirection == dir) {
    newDirection = Phaser.Math.Between(0, 3)
  }

  return newDirection;
}

export class Frog extends Phaser.Physics.Arcade.Sprite {
  private direction = Direstions.RIGHT;
  private moveEvent: Phaser.Time.TimerEvent

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.anims.play('frog_hop')

    this.moveEvent = scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.direction = randomDirection(this.direction)
      },
      loop: true,
    })
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt);

    const speed = 50;

    switch (this.direction) {
      case Direstions.UP:
        this.setVelocity(0, -speed)
        break;

      case Direstions.DOWN:
        this.setVelocity(0, speed);
        break;

      case Direstions.LEFT:
        this.setVelocity(-speed, 0);
        break;

      case Direstions.RIGHT:
        this.setVelocity(speed, 0);
        break;
    }
  }
}



