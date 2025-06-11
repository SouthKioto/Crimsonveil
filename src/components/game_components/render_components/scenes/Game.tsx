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
  private tree: Tree;
  private frog: Frog;
  private equipment: Equipment;
  private inventory;
  private frogs: Frog[];
  protected chunkSize: number;
  protected tileSize;
  protected chunks;
  private generatedChunks;
  rexPerlin!: RexPerlinPlugin;

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
    this.chunkSize = 16;
    this.generatedChunks = new Set();
    this.tileSize = 16;
    this.chunks = [];

    //anims
    CreateFrogAnims(this.anims);
    CreatePlayerAnims(this.anims);

    this.anims.create({
      key: "sprWater",
      frames: this.anims.generateFrameNumbers("sprWater"),
      frameRate: 5,
      repeat: -1,
    });

    //const noice = this.rexPerlin.add(921381293128);
    //console.log(noice.perlin2(0.1, 0.2));

    //adding player
    this.player = new Player(this, 500, 500, "player");
    this.cameras.main.startFollow(this.player);

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

  getChunk(x: number, y: number) {
    var chunk = null;
    for (var i = 0; i < this.chunks.length; i++) {
      if (this.chunks[i].x == x && this.chunks[i].y == y) {
        chunk = this.chunks[i];
      }
    }
    return chunk;
  }

  update() {
    this.player.update();

    var snappedChunkX =
      this.chunkSize *
      this.tileSize *
      Math.round(this.player.x / (this.chunkSize * this.tileSize));
    var snappedChunkY =
      this.chunkSize *
      this.tileSize *
      Math.round(this.player.y / (this.chunkSize * this.tileSize));

    snappedChunkX = snappedChunkX / this.chunkSize / this.tileSize;
    snappedChunkY = snappedChunkY / this.chunkSize / this.tileSize;

    for (var x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
      for (var y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
        var existingChunk = this.getChunk(x, y);

        if (existingChunk == null) {
          var newChunk = new Chunk(this, x, y);
          this.chunks.push(newChunk);
        }
      }
    }

    for (var i = 0; i < this.chunks.length; i++) {
      var chunk = this.chunks[i];

      if (
        Phaser.Math.Distance.Between(
          snappedChunkX,
          snappedChunkY,
          chunk.x,
          chunk.y,
        ) < 3
      ) {
        if (chunk !== null) {
          chunk.load();
        }
      } else {
        if (chunk !== null) {
          chunk.unload();
        }
      }
    }
  }
}
