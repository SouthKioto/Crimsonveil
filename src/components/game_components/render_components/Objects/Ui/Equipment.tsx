import { Weapon } from "../Weapons/Weapon";

export class Equipment {
  protected _item: Weapon;
  protected _equipmentSize: number;
  protected _equimpent: Weapon[] = [];

  constructor(item: Weapon, size: number) {
    this._item = item;
    this._equipmentSize = size;
  }

  returnInventory() {
    console.log(this._equimpent)
  }

  addItemToInventory(item: Weapon) {
    if (this._equimpent.length >= this._equipmentSize) {
      console.log("Nie ma miejsca w eq. Musisz albo wyrzucić albo zamienic");
      return;
    }
    this._equimpent.push(item);
  }
}

