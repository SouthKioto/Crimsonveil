import { EventBus } from "../EventBus";
import { generate_trees } from "../game_elements/generate_trees.tsx";
import { generate_chunks } from "../game_elements/generate_chunks.tsx";
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
import { Enemy } from "../Objects/Enemies/Enemy.tsx";

export class Game extends Scene {
  private player: Player;
  private tree: Tree;
  private frog: Frog;
  private equipment: Equipment;
  private inventory;
  private frogs: Frog[];
  private chunkSize: number;
  private generatedChunks;

  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("tiles", "public/assets/game_assets/TileSet_V1.png");

    this.load.image(
      "inventory_slot",
      "assets/game_assets/Inventory_Slot_1.png",
    );

    this.load.spritesheet("player", "/assets/game_assets/player.png", {
      frameWidth: 100,
      frameHeight: 100,
    });

    this.load.spritesheet("tree", "/assets/game_assets/trees.png", {
      frameWidth: 64,
      frameHeight: 112,
    });

    this.load.spritesheet(
      "frog_blueblue",
      "/assets/game_assets/ToxicFrogBlueBlue_Sheet.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      },
    );

    this.load.spritesheet(
      "frog_bluebrown",
      "/assets/game_assets/ToxicFrogBlueBrown_Sheet.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      },
    );

    this.load.spritesheet(
      "frog_greenblue",
      "/assets/game_assets/ToxicFrogGreenBlue_Sheet.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      },
    );

    this.load.spritesheet(
      "frog_greenbrown",
      "/assets/game_assets/ToxicFrogGreenBrown_Sheet.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      },
    );

    this.load.spritesheet(
      "frog_purpleblue",
      "/assets/game_assets/ToxicFrogPurpleBlue_Sheet.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      },
    );

    this.load.spritesheet(
      "frog_purplewhite",
      "/assets/game_assets/ToxicFrogPurpleWhite_Sheet.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      },
    );

    EventBus.emit("current-scene-ready", this);
  }

  create() {
    this.chunkSize = 512;
    this.generatedChunks = new Set();

    //anims
    CreateFrogAnims(this.anims);
    CreatePlayerAnims(this.anims);

    //generate map

    /*const array: number[][] = generate_map(100, 100);
    const map = this.make.tilemap({
      data: array,
      tileWidth: 32,
      tileHeight: 32,
    });
    const tiles = map.addTilesetImage(null, "tiles");
    const layer = map.createLayer(0, tiles, 0, 0);
  */
    //add frog enemies

    //frog = new Frog(this, 500, 700, 'frog_blueblue', 'frog_hop', 'frog_stay', 'frog_attack')
    //console.log(`frog health: ${frog.health}`)

    generate_frogs(this, 5);

    //adding player
    this.player = new Player(this, 500, 500, "player");
    this.cameras.main.startFollow(this.player);

    this.player.updateHealth(20);
    console.log(this.player.health);

    //console.log(player.health)

    const sword = new Sword(this, 900, 500, "Sword");
    sword.getWeaponInfo();

    for (let i = 1; i <= 5; i++) {
      const sword1 = new Sword(this, 500, 500, "Sword");
      this.player.addToInventory(sword1);
    }

    console.log(this.player.showEquipment());

    //generate trees
    generate_trees(50, this);

    //this.physics.add.collider(player, treeGroup)

    //EventBus.emit('current-scene-ready', this); //potrzebne do laczenia phasera i react ui
  }

  update() {
    this.player.update();
    const playerChunkX = Math.floor(this.player.x / this.chunkSize);
    const playerChunkY = Math.floor(this.player.y / this.chunkSize);

    const chunkKey = `${playerChunkX}, ${playerChunkY}`;
    if (!this.generatedChunks.has(chunkKey)) {
      generate_chunks(this, playerChunkX, playerChunkY, this.chunkSize);
      this.generatedChunks.add(chunkKey);
    }
  }
}
