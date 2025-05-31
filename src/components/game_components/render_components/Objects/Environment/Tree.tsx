import Phaser from "phaser";

export class Tree extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, frame = 0) {
    super(scene, x, y, 'tree', frame)

  }
}
