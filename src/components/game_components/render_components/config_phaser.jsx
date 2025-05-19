// tutaj beda importowane sceny z folderu scenes
import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  scene: [
    Boot,
    Preloader,
    MainMenu,
    Game,
    GameOver
  ]

};

export const StartGame = (parent) => {
  return new Phaser.Game({ ...config, parent });
} 
