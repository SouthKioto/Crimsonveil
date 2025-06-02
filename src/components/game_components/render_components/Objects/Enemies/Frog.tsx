import Phaser from "phaser";
import { Enemy } from "./Enemy";

export class Frog extends Enemy {

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, enemyMoveAnims: string, enemyStayAnims: string, enemyAttackAnims: string) {
    super(scene, x, y, texture, enemyMoveAnims, enemyStayAnims, enemyAttackAnims);

    this.setSize(20, 17)
    this.setScale(1.2)

    this._damage = 15;
    this._health = 150;
  }

  get damage() {
    return this._damage;
  }

  get health() {
    return this._health;
  }





}
