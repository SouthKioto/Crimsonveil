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
import { add_player } from "../game_elements/add_player.tsx";
import { KeymapsManager } from "../game_elements/KeymapsManager.tsx";
import { player_control } from "../game_elements/player_control.tsx";


import keymaps_json from "../../../../components/settings/keymaps.json";
import { Weapon } from "../Objects/Weapons/Weapon.tsx";
import { Sword } from "../Objects/Weapons/Sword.tsx";

//keymaps


var player: Player;
var tree: Tree;
var frog: Frog;

//hitboxes

// creacte WSAD keys

//movement
const movement_speed = 200;

//flip
var isFlipped: boolean;

//keymaps
//const keymaps_obj;

/*useEffect(() => {
  fetch("../../../../components/settings/keymaps.json")
    .then((res) => res.json)
    .then((data) => )
})*/


export class Game extends Scene {
  private keymapsManager: KeymapsManager;

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
    //keyMaps

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
    generate_frogs(this, 5, 'frog')

    //adding player
    player = add_player(this, 'player')

    //console.log(player.health)

    this.keymapsManager = new KeymapsManager(keymaps_json);
    this.keymapsManager.registerKeys(this.input.keyboard)


    const sword = new Sword(this, 500, 500, "Sword");
    sword.getWeaponInfo()


    //this.physics.add.collider(player, treeGroup)

    //EventBus.emit('current-scene-ready', this); //potrzebne do laczenia phasera i react ui
  }

  update() {
    if (!player || !player.body) return;

    var isMoving = false;
    var isAttacking = false;
    var isNormalAttack = false;
    var isStrongAttack = false;
    var isBowAttack = false;

    player.setVelocity(0)

    if (this.keymapsManager.getKey("Left")?.isDown) {
      player.setVelocityX((-1) * (movement_speed))
      isMoving = true;
      isFlipped = true;

    } else if (this.keymapsManager.getKey("Right")?.isDown) {
      player.setVelocityX(movement_speed)
      isMoving = true;
      isFlipped = false;

    } else if (this.keymapsManager.getKey("Up")?.isDown) {
      player.setVelocityY((-1) * (movement_speed))
      isMoving = true;

    } else if (this.keymapsManager.getKey("Down")?.isDown) {
      player.setVelocityY(movement_speed)
      isMoving = true;
    }

    if (this.keymapsManager.getKey("Attack")?.isDown) {
      isAttacking = true;
      isNormalAttack = true;
      isMoving = false;
      player.setVelocity(0);

      //console.log("Attack");

    }

    if (this.keymapsManager.getKey("Strong_Attack")?.isDown) {
      isAttacking = true;
      isStrongAttack = true;
      isMoving = false;
      player.setVelocity(0);

      //console.log("Strong Attack");
    }

    if (this.keymapsManager.getKey("Bow_Attack")?.isDown) {
      isAttacking = true;
      isBowAttack = true;
      isMoving = false;
      player.setVelocity(0);


      //console.log("BowAttack");
    }

    player.setFlipX(isFlipped);

    if (isAttacking) {
      if (isNormalAttack) {
        if (player.anims.currentAnim?.key !== 'attack') {
          console.log("Playing attack");
          player.play('attack');
        }
      } else if (isStrongAttack) {
        if (player.anims.currentAnim?.key !== 'strong_attack') {
          console.log("Playing strong_attack");
          player.play('strong_attack');
        }
      } else if (isBowAttack) {
        if (player.anims.currentAnim?.key !== 'bow_attack') {
          console.log("Playing bow_attack");
          player.play('bow_attack');
        }
      }
    } else if (isMoving) {
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
