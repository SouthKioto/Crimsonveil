// tutaj beda importowane sceny z folderu scenes
import { getWidth, getHeight } from "./utils/max_width_and_height.tsx";
import { Game } from "./scenes/Game";
import Phaser, { Physics } from "phaser";

console.log(getWidth() + " | " + getHeight());

const config_phaser = {
  type: Phaser.AUTO,
  width: getWidth(),
  height: getHeight(),
  parent: "game-container",
  backgroundColor: "#000000",
  scene: Game,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true, //TODO chande at the end
    },
  },
};

export const StartGame = (parent) => {
  return new Phaser.Game({ ...config_phaser, parent });
};
