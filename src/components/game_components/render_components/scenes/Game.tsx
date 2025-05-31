import { EventBus } from "../EventBus";
import { generate_trees } from "../game_elements/generate_trees.tsx";
import { generate_map } from "../game_elements/generate_map.tsx";
import { Scene } from "phaser";
import { Player } from "../Objects/Characters/Player";
import { Tree } from "../Objects/Environment/Tree.tsx";
import { Frog } from "../Objects/Enemies/Frog.tsx";
import { Sword } from "../Objects/Weapons/Sword.tsx";
import { Equipment } from "../Objects/Ui/Equipment.tsx";
import { generate_frogs } from "../game_elements/generate_frogs.tsx";
import { CreateFrogAnims } from "../anims/CreateFrogAnims.tsx";
import { CreatePlayerAnims } from "../anims/CreatePlayerAnims.tsx";
import { add_player } from "../game_elements/add_player.tsx";
import { searchForWorkspaceRoot } from "vite";


var player: Player;
var tree: Tree;
var frog: Frog;
var equipment: Equipment;

var frogs: Frog[];

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

    this.load.spritesheet('frog', "/assets/game_assets/ToxicFrogBlueBlue_Sheet.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  create() {
    //anims
    CreateFrogAnims(this.anims)
    CreatePlayerAnims(this.anims)

    //generate map
    const array: number[][] = generate_map(100, 100);
    const map = this.make.tilemap({ data: array, tileWidth: 32, tileHeight: 32 })
    const tiles = map.addTilesetImage(null, "tiles");
    const layer = map.createLayer(0, tiles, 0, 0)

    //generate trees
    generate_trees(50, this)

    //add frog enemies
    frog = new Frog(this, 500, 700, 'frog')
    console.log(`frog health: ${frog.health}`)

    //generate_frogs(this, 5, 'frog')

    //adding player
    player = new Player(this, 500, 500, 'player')
    console.log(`Player health: ${player.health}`);

    player.updateHealth(20);
    console.log(player.health);

    //console.log(player.health)

    const sword = new Sword(this, 900, 500, "Sword"); sword.getWeaponInfo()

    //create equipment
    equipment = new Equipment(sword, 5);

    /*for (let i = 0; i <= 9; i++) {
      const sword1 = new Sword(this, 500, 500, "Sword");
      equipment.addItemToInventory(sword1);
    }*/

    equipment.returnInventory();


    //this.physics.add.collider(player, treeGroup)

    //EventBus.emit('current-scene-ready', this); //potrzebne do laczenia phasera i react ui
  }

  update() {
    player.update();
  }
}
