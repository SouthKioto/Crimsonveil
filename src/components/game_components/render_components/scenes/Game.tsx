import { EventBus } from "../EventBus";
import { generate_trees } from "../game_elements/generate_trees.tsx";
import { generate_map } from "../game_elements/generate_map.tsx";
import { Scene } from "phaser";
import { Player } from "../Objects/Player";
import { Tree } from "../Objects/Tree.tsx";
import { Frog } from "../Objects/Frog.tsx";
import { generate_frogs } from "../game_elements/generate_frogs.tsx";
import { CreateFrogAnims } from "../anims/CreateFrogAnims.tsx";
import { CreatePlayerAnims } from "../anims/CreatePlayerAnims.tsx";

var player: Player;
var tree: Tree;
var treeGroup;
var frog: Frog;


// creacte WSAD keys
let KeyA: Phaser.Input.Keyboard.Key;
let KeyD: Phaser.Input.Keyboard.Key;
let KeyW: Phaser.Input.Keyboard.Key;
let KeyS: Phaser.Input.Keyboard.Key;
let KeySpaceAttack: Phaser.Input.Keyboard.Key;

//movement
const movement_speed = 200;

export class Game extends Scene {

  constructor() {
    super('Game')
  }

  preload() {

    this.load.image("tiles", "public/assets/game_assets/TileSet_V1.png");

    this.load.spritesheet("player", "/assets/game_assets/player.png", {
      frameWidth: 100,
      frameHeight: 100,
    });

    this.load.spritesheet('tree', "/assets/game_assets/trees.png", {
      frameWidth: 64,
      frameHeight: 112,
    });

    this.load.spritesheet('frog', "/assets/game_assets/ToxicFrogBlueBlue_Hop.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

  }

  create() {
    //keyMaps
    KeyA = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    KeyD = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    KeyW = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    KeyS = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    KeySpaceAttack = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    //anims
    CreateFrogAnims(this.anims)
    CreatePlayerAnims(this.anims)

    //generate map
    const array: number[][] = generate_map(100, 100);
    const map = this.make.tilemap({ data: array, tileWidth: 32, tileHeight: 32 })
    const tiles = map.addTilesetImage(null, "tiles");
    const layer = map.createLayer(0, tiles, 0, 0)

    //generate trees
    generate_trees(5000, this)

    //adding player
    const playerSprite = new Player(this, 400, 400);
    player = this.physics.add.existing(playerSprite) as Player;
    this.add.existing(player);
    player.setScale(2)


    //add frog enemies
    /*let frogSprite = new Frog(this, 500, 400, "frog");
    frog = this.physics.add.existing(frogSprite) as Frog;
    this.add.existing(frog)*/

    generate_frogs(this, 20, 'frog')

    //this.physics.add.collider(player, treeGroup)

    //keys = this.input.keyboard?.createCursorKeys(); 


    //EventBus.emit('current-scene-ready', this); //potrzebne do laczenia phasera i react ui
  }

  update() {
    if (!player || !player.body) return;


    var isMoving = false;
    var isAttacking = false;

    player.setVelocity(0)

    if (KeyA.isDown) {
      player.setVelocityX((-1) * (movement_speed))
    } else if (KeyD.isDown) {
      player.setVelocityX(movement_speed)

    } else if (KeyW.isDown) {
      player.setVelocityY((-1) * (movement_speed))

    } else if (KeyS.isDown) {
      player.setVelocityY(movement_speed)
    }

    if (!isMoving && isAttacking) {
      if (player.anims.currentAnim?.key !== 'walking') {
        player.play('walking');
      }
    } else {
      if (player.anims.currentAnim?.key !== 'idle') {
        player.play("idle");
      }
    }

    if (KeySpaceAttack.isDown) {
      player.play("attack")
    }
  }
}
