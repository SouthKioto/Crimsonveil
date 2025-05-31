import Phaser from "phaser";
import { KeymapsManager } from "../../game_elements/KeymapsManager";
import keymaps_json from "../../../../../components/settings/keymaps.json";
import { Character } from "./Character";

enum HealthState {
  IDLE,
  DAMAGE,
  DEAD
}

export class Player extends Character {
  private keymapsManager: KeymapsManager;
  private isFlipped: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.keymapsManager = new KeymapsManager(keymaps_json);
    this.keymapsManager.registerKeys(scene.input.keyboard);

    this.setSize(8, 15);
    this.setScale(2);

    this._health = 110;
    this._movementSpeed = 200;
  }

  get health() {
    return this._health;
  }

  get damage() {
    return this._damage;
  }

  updateHealth = (value: number) => {
    if (value && this._health !== 0) {
      this._health += value;
    }
  }

  update() {
    if (!this || !this.body) return;

    let isMoving = false;
    let isAttacking = false;
    let isNormalAttack = false;
    let isStrongAttack = false;
    let isBowAttack = false;

    this.setVelocity(0);

    // Movement
    if (this.keymapsManager.getKey("Left")?.isDown) {
      this.setVelocityX(-this._movementSpeed);
      isMoving = true;
      this.isFlipped = true;

    } else if (this.keymapsManager.getKey("Right")?.isDown) {
      this.setVelocityX(this._movementSpeed);

      isMoving = true;
      this.isFlipped = false;

    } else if (this.keymapsManager.getKey("Up")?.isDown) {
      this.setVelocityY(-this._movementSpeed);
      isMoving = true;

    } else if (this.keymapsManager.getKey("Down")?.isDown) {
      this.setVelocityY(this._movementSpeed);
      isMoving = true;

    }

    // Attacks
    if (this.keymapsManager.getKey("Attack")?.isDown) {
      isAttacking = true;
      isNormalAttack = true;
      isMoving = false;
      this.setVelocity(0);
    }

    if (this.keymapsManager.getKey("Strong_Attack")?.isDown) {
      isAttacking = true;
      isStrongAttack = true;
      isMoving = false;
      this.setVelocity(0);
    }

    if (this.keymapsManager.getKey("Bow_Attack")?.isDown) {
      isAttacking = true;
      isBowAttack = true;
      isMoving = false;
      this.setVelocity(0);
    }

    this.setFlipX(this.isFlipped);

    // Animations
    if (isAttacking) {
      if (isNormalAttack && this.anims.currentAnim?.key !== 'attack') {
        this.play('attack');
      } else if (isStrongAttack && this.anims.currentAnim?.key !== 'strong_attack') {
        this.play('strong_attack');
      } else if (isBowAttack && this.anims.currentAnim?.key !== 'bow_attack') {
        this.play('bow_attack');
      }
    } else if (isMoving) {
      if (this.anims.currentAnim?.key !== 'walking') {
        this.play('walking');
      }
    } else {
      if (this.anims.currentAnim?.key !== 'idle') {
        this.play('idle');
      }
    }
  }

}
