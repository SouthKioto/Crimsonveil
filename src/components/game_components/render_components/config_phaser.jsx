// tutaj beda importowane sceny z folderu scenes
import { getWidth, getHeight } from "./utils/max_width_and_height.tsx";
import { Game } from "./scenes/Game";
import Phaser, { Physics } from "phaser";
import PerlinPlugin from "phaser3-rex-plugins/plugins/perlin-plugin.js";

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

  plugins: {
    scene: [
      {
        key: "rexPerlin",
        plugin: PerlinPlugin,
        mapping: "rexPerlin",
      },
    ],
  },
};

export const StartGame = (parent) => {
  return new Phaser.Game({ ...config_phaser, parent });
};
