import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { generate_map } from "../utils/generate_map";

export class Game extends Scene {
  constructor() {
    super('Game')
  }


  preload() {

    this.load.image("tiles", "public/assets/game_assets/TileSet_V1.png");
    //this.load.image("player", ""); 
  }

  create() {
    const array: number[][] = generate_map(100, 100);

    const map = this.make.tilemap({ data: array, tileWidth: 32, tileHeight: 32 })
    const tiles = map.addTilesetImage(null, "tiles");

    const layer = map.createLayer(0, tiles, 0, 0)

    //    EventBus.emit('current-scene-ready', this);
  }

  update() {

  }

}
