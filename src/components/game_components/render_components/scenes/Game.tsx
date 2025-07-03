import { generate_chunks } from "../game_elements/generate_chunks.tsx";
import { generate_frogs } from "../game_elements/generate_frogs.tsx";
import { generate_trees } from "../game_elements/generate_trees.tsx";

import RexPerlinPlugin from "phaser3-rex-plugins/plugins/perlin-plugin";

import { EventBus } from "../EventBus.tsx";
import { Scene } from "phaser";
import { Player } from "../Objects/Characters/Player";
import { Tree } from "../Objects/Environment/Tree.tsx";
import { Frog } from "../Objects/Enemies/Frog.tsx";
import { Sword } from "../Objects/Weapons/Sword.tsx";
import { Equipment } from "../Objects/Ui/Equipment.tsx";
import { Chunk } from "../Objects/Area/Chunk.tsx";
import { CreateFrogAnims } from "../anims/CreateFrogAnims.tsx";
import { CreatePlayerAnims } from "../anims/CreatePlayerAnims.tsx";

export class Game extends Scene {
  private player: Player;
  protected chunkSize: number;
  protected tileSize;
  protected chunks;
  rexPerlin!: RexPerlinPlugin;
  protected WORDL_SEED;

  constructor() {
    super("Game");
  }

  preload() {
    this.load.spritesheet("sprWater", "assets/game_assets/sprWater.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.image("sprSand", "/assets/game_assets/sprSand.png");
    this.load.image("sprGrass", "/assets/game_assets/sprGrass.png");

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
    this.WORDL_SEED = 921381293128;
    const noice = this.rexPerlin.add(this.WORDL_SEED);
    console.log(noice);

    //anims
    CreateFrogAnims(this.anims);
    CreatePlayerAnims(this.anims);

    this.anims.create({
      key: "sprWater",
      frames: this.anims.generateFrameNumbers("sprWater"),
      frameRate: 5,
      repeat: -1,
    });

    //adding player
    this.player = new Player(this, 500, 500, "player");

    this.player.updateHealth(20);
    console.log(this.player.health);

    //console.log(player.health)

    const sword = new Sword(this, 900, 500, "Sword");
    sword.getWeaponInfo();

    /*for (let i = 1; i <= 5; i++) {
      const sword1 = new Sword(this, 500, 500, "Sword");
      this.player.addToInventory(sword1);
    }*/

    console.log(this.player.showEquipment());
    //this.physics.add.collider(player, treeGroup)
  }

  update() {
    this.player.update();
    generate_chunks(this, 25, 16, this.player, this.WORDL_SEED);
  }
}
