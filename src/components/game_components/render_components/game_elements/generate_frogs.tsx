import { getHeight, getWidth } from "../utils/max_width_and_height"
import { Frog } from "../Objects/Frog";


export const generate_frogs = (scene: Phaser.Scene, frogsCount: number, texture: string) => {

  let frog: Frog;

  for (let i = 1; i <= frogsCount; i++) {
    let randomX = Math.random() * getWidth();
    let randomY = Math.random() * getHeight();

    frog = new Frog(scene, randomX, randomY, texture);
    scene.physics.add.existing(frog);
    scene.add.existing(frog);

    frog.setSize(15, 15)
    frog.setScale(1.2)

  }
}
