import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { generate_map } from "../utils/generate_map";
import { Player } from "../game_elements/Player";

var player: Phaser.Physics.Arcade.Sprite;
var keys;

// creacte WSAD keys
let KeyA;
let KeyD;
let KeyW;
let KeyS;

export class Game extends Scene {

  constructor() {
    super('Game')
  }

  preload() {

    this.load.image("tiles", "public/assets/game_assets/TileSet_V1.png");
    this.load.spritesheet("player", "public/assets/game_assets/player.png", {
      frameWidth: 100,
      frameHeight: 100,
    });
  }

  create() {
    KeyA = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    KeyD = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    KeyW = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    KeyS = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);


    const array: number[][] = generate_map(100, 100);
    const map = this.make.tilemap({ data: array, tileWidth: 32, tileHeight: 32 })
    const tiles = map.addTilesetImage(null, "tiles");
    const layer = map.createLayer(0, tiles, 0, 0)

    player = this.physics.add.sprite(500, 500, 'player');

    keys = this.input.keyboard?.createCursorKeys();

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "walking",
      frames: this.anims.generateFrameNumbers('player', { start: 9, end: 16 }),
      frameRate: 10,
      repeat: -1
    })

    //    EventBus.emit('current-scene-ready', this);
  }

  update() {

    var isMoving = false;

    player.setVelocity(0)


    if (KeyA.isDown) {
      player.setVelocityX(-100)
    } else if (KeyD.isDown) {
      player.setVelocityX(100)

    } else if (KeyW.isDown) {
      player.setVelocityY(-100)

    } else if (KeyS.isDown) {
      player.setVelocityY(100)
    }

    if (!isMoving) {
      if (player.anims.currentAnim?.key !== 'walking') {
        player.play('walking');
      }

    } else {
      if (player.anims.currentAnim?.key !== 'idle') {
        player.play("idle");
      }
    }

  }

}
