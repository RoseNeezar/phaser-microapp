import tilemap from "../assets/tilemaps/tilemap.json";
import tiles from "../assets/images/tiles.png";
import player from "../assets/images/player.png";
export default class LoaderScene extends Phaser.Scene {
  remote: any;
  constructor(remote: any) {
    super(remote);
    this.remote = remote;
  }

  public preload() {
    this.load.tilemapTiledJSON("tilemap", tilemap);
    this.load.image("tiles", tiles);
    this.load.spritesheet("player", player, {
      frameWidth: 16,
      frameHeight: 32,
    });
  }

  public create() {
    this.remote = "something state!!!";
    this.remote.pluginManager.plugins[0].data(true);
    this.scene.start("game");
  }
}
