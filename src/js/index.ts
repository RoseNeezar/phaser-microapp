import "phaser";
import LoaderScene from "./LoaderScene";
import GameScene from "./GameScene";

class RemoteStates extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    //initialize player state
  }
  //Additional methods for getting managing player data
  isAlive() {
    return true;
  }
  remoteApp() {
    //@ts-ignore
    const { showSidebar } = this.pluginManager.plugins[0].data();
    return showSidebar;
  }
}

const useMount = (el: any, routePrefix?: string, useRemoteStore?: any) => {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent: el,
    width: 256,
    height: 224,
    zoom: 2,
    input: {
      keyboard: true,
      gamepad: true,
    },
    render: {
      pixelArt: true,
      antialias: false,
      antialiasGL: false,
    },
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
        gravity: {
          y: 500,
        },
      },
    },
    scene: [LoaderScene, GameScene],
    plugins: {
      global: [
        {
          key: "RemoteStates",
          plugin: RemoteStates,
          start: false,
          mapping: "remote",
          data: useRemoteStore,
        },
      ],
    },
  });
};

const devRoot = document.querySelector("#content");
if (devRoot) {
  useMount(devRoot, "app", null);
}

export { useMount };
