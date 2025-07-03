import Phaser from "phaser";
export class Tree extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, frame = 0) {
    super(scene, x, y, "tree", frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDepth(2);
    this.setScale(2);
    this.setSize(10, 20);
    this.setOffset(27, 75);
  }
}
