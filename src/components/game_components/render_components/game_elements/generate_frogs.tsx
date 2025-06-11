import { getHeight, getWidth } from "../utils/max_width_and_height";
import { Frog } from "../Objects/Enemies/Frog.tsx";

/**
 * @function generate_frogs
 * @param {Phaser.Scene} scene - phaser current scene
 * @param {number} frogCount - count frog in chunk
 * @param {number} chunkSize - size of generated chunk
 * @param {{x: number, y: number}[]} chunkPosition - position of current chunk
 */

export const generate_frogs = (
  scene: Phaser.Scene,
  frogsCount: number,
  chunkSize: number,
) => {
  const textures: string[] = [
    "_blueblue",
    "_bluebrown",
    "_greenblue",
    "_greenbrown",
    "_purpleblue",
    "_purplewhite",
  ];

  let frog: Frog;
  let frogs: Frog[];

  for (let i = 0; i <= frogsCount; i++) {
    let randomX = Math.random() * chunkSize;
    let randomY = Math.random() * chunkSize;
    let randomTexture = Math.floor(Math.random() * textures.length);

    frog = new Frog(
      scene,
      randomX,
      randomY,
      `frog${textures[randomTexture]}`,
      `frog${textures[randomTexture]}_hop`,
      `frog${textures[randomTexture]}_stay`,
      `frog${textures[randomTexture]}_attack`,
    );
    //frogs.push(frog);
  }
};
