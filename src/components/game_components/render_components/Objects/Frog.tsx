import Phaser, { Scene } from "phaser";

enum Moving {
  MOVE,
  NOT_MOVE
}

enum Directions {
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

const frogMoveOrNot = () => {
  return Phaser.Math.Between(0, 1) === 1;
}

export class Frog extends Phaser.Physics.Arcade.Sprite {
  public direction = Directions.RIGHT;
  private chooseStayMoveEvent: Phaser.Time.TimerEvent;
  private moveEvent?: Phaser.Time.TimerEvent;
  private isMoving = false;
  private isFlipped: boolean;


  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.isMoving = frogMoveOrNot();
    if (this.isMoving) {
      this.frog_move(scene);
    } else {
      this.frog_stay();
    }

    this.chooseStayMoveEvent = scene.time.addEvent({
      delay: 4000,
      callback: () => {
        this.isMoving = frogMoveOrNot();
        console.log("Czy żaba się rusza?", this.isMoving);

        if (this.isMoving) {
          this.frog_move(scene);
        } else {
          this.frog_stay();
        }
      },
      loop: true,
    });
  }

  private frog_stay() {
    if (this.moveEvent) {
      this.moveEvent.remove();
      this.moveEvent = undefined;
    }

    this.setVelocity(0, 0);
    this.anims.play("frog_stay", true);
  }

  private frog_move(scene: Phaser.Scene) {
    this.anims.play("frog_hop", true);

    if (this.moveEvent) {
      this.moveEvent.remove();
    }

    this.moveEvent = scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.direction = randomDirection(this.direction);

      },
      loop: true,
    });
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt);

    if (!this.isMoving) {
      this.setVelocity(0, 0);
      return;
    }

    const speed = 30;

    switch (this.direction) {
      case Directions.UP:
        this.setVelocity(0, -speed);
        break;
      case Directions.DOWN:
        this.setVelocity(0, speed);
        break;
      case Directions.LEFT:
        this.setVelocity(-speed, 0);
        break;
      case Directions.RIGHT:
        this.setVelocity(speed, 0);
        break;
    }
  }
}
