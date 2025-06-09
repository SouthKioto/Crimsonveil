import Phaser, { Scene } from "phaser";
import { Weapon } from "../Weapons/Weapon";

export class Equipment {
  protected _scene: Phaser.Scene;

  protected _equipmentSize: number;
  protected _equimpent: Weapon[];

  constructor(scene: Phaser.Scene, size: number) {
    this._scene = scene;

    this._equimpent = [];
    this._equipmentSize = size;
  }

  returnInventory() {
    return this._equimpent;
  }

  addItemToInventory(item: Weapon) {
    console.log("Dodaję item:", item);

    if (this._equimpent.length >= this._equipmentSize) {
      console.log("Nie ma miejsca w eq.");
      return;
    }

    this._equimpent.push(item);
  }
}
