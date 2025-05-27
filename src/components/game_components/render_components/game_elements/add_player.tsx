import Phaser from "phaser";
import { Player } from "../Objects/Player";


var player: Player;

export const add_player = (scene: Phaser.Scene, texture: string) => {

  const playerSprite = new Player(scene, 400, 400, texture);
  player = scene.physics.add.existing(playerSprite) as Player;
  scene.add.existing(player);
  player.setSize(8, 15);
  player.setScale(2)

  return player;
}



