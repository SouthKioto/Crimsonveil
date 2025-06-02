import Phaser from "phaser";

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

const enemyMoveOrNot = () => {
  return Phaser.Math.Between(0, 1) === 1;
}

/*
 * Enemy class
 * Representing an enemy in the game.
 * @class
 */

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  protected direction = Directions.RIGHT;
  protected chooseStayMoveEvent: Phaser.Time.TimerEvent;
  protected moveEvent?: Phaser.Time.TimerEvent;
  protected isFlipped: boolean;
  protected isMoving = false;

  protected moveAnims: string;
  protected stayAnims: string;
  protected attackAnims: string;

  protected _damage: number;
  protected _health: number;

  /**
  * Creates a enemy instance
  *
  * @param {Phaser.Scene} scene - Phaser current scene
  * @param {number} x - position x 
  * @param {number} y - position y  
  * @param {string} texture - Texture of generated enemy 
  * @param {string} enemyMoveAnims - loaded enemy move anims
  * @param {string} enemyStayAnims - loaded enemy stay anims
  * @param {string} enemyAttackAnims - loaded enemy attack anims
  */

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, enemyMoveAnims: string, enemyStayAnims: string, enemyAttackAnims: string) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.moveAnims = enemyMoveAnims;
    this.stayAnims = enemyStayAnims;
    this.attackAnims = enemyAttackAnims;

    this.isMoving = enemyMoveOrNot();
    if (this.isMoving) {
      this.enemy_move(scene, this.moveAnims);
    } else {
      this.enemy_stay(this.stayAnims);
    }

    this.chooseStayMoveEvent = scene.time.addEvent({
      delay: 4000,
      callback: () => {
        this.isMoving = enemyMoveOrNot();
        //console.log("Czy zaba się rusza?", this.isMoving);

        if (this.isMoving) {
          this.enemy_move(scene, this.moveAnims);
        } else {
          this.enemy_stay(this.stayAnims);
        }
      },
      loop: true,
    });
  }

  /**
  * enemy_stay
  * @param {string} anims - Loaded stay anims 
  */

  private enemy_stay(anims: string) {
    if (this.moveEvent) {
      this.moveEvent.remove();
      this.moveEvent = undefined;
    }

    this.setVelocity(0, 0);
    this.anims.play(anims, true);
  }

  /**
   * enemy_move
   * @param {Phaser.Scene} scene - Current moving scene
   * @param {string} anims - Loaded move anims 
   */

  private enemy_move(scene: Phaser.Scene, anims: string) {
    this.anims.play(anims, true);

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
        this.setFlipX(true);

        break;
      case Directions.RIGHT:
        this.setVelocity(speed, 0);
        this.setFlipX(false);
        break;
    }
  }

}

