import Phaser, { Scene } from "phaser";
import { Weapon } from "../Weapons/Weapon";

export class Equipment {
  protected _x: number;
  protected _y: number;
  protected _scene: Phaser.Scene;

  protected _item: Weapon;
  protected _equipmentSize: number;
  protected _equimpent: Weapon[];
  protected _invetoryVisibility: boolean;
  protected _invetoryContainer: Phaser.GameObjects.Container;

  protected _slotTexture: string;

  constructor(scene: Phaser.Scene, x: number, y: number, size: number, slotTexture: string) {
    this._scene = scene;
    this._x = x;
    this._y = y;
    this._equimpent = [];
    this._slotTexture = slotTexture;
    this._equipmentSize = size;
  }

  toggleInventory(visible: boolean) {
    this._invetoryVisibility = visible;
    console.log(this._invetoryContainer)

    if (this._invetoryContainer) {
      this._invetoryContainer.setVisible(visible);
      console.log("dzała toggleInventory")
      console.log(this._equimpent)
    }
  }

  returnInventory() {
    console.log(this._equimpent);
  }

  addItemToInventory(item: Weapon) {
    console.log("Dodaję item:", item);

    if (this._equimpent.length >= this._equipmentSize) {
      console.log("Nie ma miejsca w eq.");
      return;
    }

    this._equimpent.push(item);
    console.log("Aktualne EQ:", this._equimpent);

    if (this._invetoryContainer) {
      this._invetoryContainer.removeAll(true);
      this.rebuildInventoryUI();
    }
  }

  createEquipment() {
    if (this._invetoryContainer) return;

    this._invetoryContainer = this._scene.add.container(this._x, this._y).setVisible(false);

    const slotSize = 64;
    const cols = 10;

    this._equimpent.forEach((item, index) => {
      const x = (index % cols) * (slotSize + 10);
      const y = Math.floor(index / cols) * (slotSize + 10);

      const slot = this._scene.add.image(x, y, this._slotTexture).setOrigin(0);
      this._invetoryContainer.add(slot);

      if (item) {
        const icon = this._scene.add.image(x + 8, y + 8, 'icon.png')
          .setOrigin(0)
          .setDisplaySize(48, 48);
        this._invetoryContainer.add(icon);
      }
    });
  }

  private rebuildInventoryUI() {
    const slotSize = 64;
    const cols = 10;

    this._equimpent.forEach((item, index) => {
      const x = (index % cols) * (slotSize + 10);
      const y = Math.floor(index / cols) * (slotSize + 10);

      const slot = this._scene.add.image(x, y, this._slotTexture).setOrigin(0);
      this._invetoryContainer.add(slot);

      if (item) {
        const icon = this._scene.add.image(x + 8, y + 8, 'icon.png')
          .setOrigin(0)
          .setDisplaySize(48, 48);
        this._invetoryContainer.add(icon);
      }
    });
  }

}
