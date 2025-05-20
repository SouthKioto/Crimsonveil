// tutaj beda importowane sceny z folderu scenes

import { Game } from './scenes/Game';
import Phaser from "phaser";

export const config_phaser = {
  type: Phaser.AUTO,
  width: 800,
  height: 900,
  parent: "game-container",
  backgroundColor: "#028af8",
  scene: Game,
};

