import Phaser from "phaser";
import { KeymapsManager } from "../../game_elements/KeymapsManager";
import keymaps_json from "../../../../../components/settings/keymaps.json";
import { Character } from "./Character";
import { Equipment } from "../Ui/Equipment";
import type { Weapon } from "../Weapons/Weapon";

enum HealthState {
  IDLE,
  DAMAGE,
  DEAD,
}

export class Player extends Character {
  private keymapsManager: KeymapsManager;
  private isFlipped: boolean;
  private inventoryIsOpen: boolean = false;
  protected _equipment: Equipment;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.keymapsManager = new KeymapsManager(keymaps_json);
    this.keymapsManager.registerKeys(scene.input.keyboard);

    this.setSize(8, 15);
    this.setScale(2);

    this._health = 110;
    this._movementSpeed = 200;

    this._equipment = new Equipment(scene, 10);
    this.setEquipment(this._equipment);
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
  };

  setEquipment(equipment: Equipment) {
    this._equipment = equipment;
  }

  addToInventory(item: Weapon) {
    if (this._equipment) {
      this._equipment.addItemToInventory(item);
    }
    return;
  }

  showEquipment() {
    return this._equipment.returnInventory();
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

    //inventory

    if (
      Phaser.Input.Keyboard.JustDown(this.keymapsManager.getKey("Equipment"))
    ) {
      this.inventoryIsOpen = !this.inventoryIsOpen;
      this.equipment.toggleInventory(this.inventoryIsOpen);

      console.log("Input player Działą");
    }

    this.setFlipX(this.isFlipped);

    // Animations
    if (isAttacking) {
      if (isNormalAttack && this.anims.currentAnim?.key !== "attack") {
        this.play("attack");
      } else if (
        isStrongAttack &&
        this.anims.currentAnim?.key !== "strong_attack"
      ) {
        this.play("strong_attack");
      } else if (isBowAttack && this.anims.currentAnim?.key !== "bow_attack") {
        this.play("bow_attack");
      }
    } else if (isMoving) {
      if (this.anims.currentAnim?.key !== "walking") {
        this.play("walking");
      }
    } else {
      if (this.anims.currentAnim?.key !== "idle") {
        this.play("idle");
      }
    }
  }
}
