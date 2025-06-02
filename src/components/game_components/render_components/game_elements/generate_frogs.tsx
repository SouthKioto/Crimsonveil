import { getHeight, getWidth } from "../utils/max_width_and_height"
import { Frog } from "../Objects/Enemies/Frog.tsx";


export const generate_frogs = (scene: Phaser.Scene, frogsCount: number) => {

  const textures: string[] = [
    "_blueblue",
    "_bluebrown",
    "_greenblue",
    "_greenbrown",
    "_purpleblue",
    "_purplewhite",
  ]

  let frog: Frog;
  let frogs: Frog[];

  for (let i = 1; i <= frogsCount; i++) {
    let randomX = Math.random() * getWidth();
    let randomY = Math.random() * getHeight();
    let randomTexture = Math.floor(Math.random() * textures.length);

    frog = new Frog(scene, randomX, randomY, `frog${textures[randomTexture]}`, `frog${textures[randomTexture]}_hop`, `frog${textures[randomTexture]}_stay`, `frog${textures[randomTexture]}_attack`);
    //frogs.push(frog);
  }

}
