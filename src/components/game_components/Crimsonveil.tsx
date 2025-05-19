
import { useState, useRef } from "react";
import Phaser from 'phaser';
import { PhaserGame } from "./render_components/PhaserGame";

export const Crimsonveil = () => {
  // The sprite can only be moved in the MainMenu Scene
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef();
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

  const changeScene = () => {

    const scene = phaserRef.current.scene;

    if (scene) {
      scene.changeScene();
    }
  }

  const moveSprite = () => {

    const scene = phaserRef.current.scene;

    if (scene && scene.scene.key === 'MainMenu') {
      // Get the update logo position
      scene.moveLogo(({ x, y }) => {

        setSpritePosition({ x, y });

      });
    }
  }

  const addSprite = () => {

    const scene = phaserRef.current.scene;

    if (scene) {
      const x = Phaser.Math.Between(64, scene.scale.width - 64);
      const y = Phaser.Math.Between(64, scene.scale.height - 64);

      const star = scene.add.sprite(x, y, 'star');

      scene.add.tween({
        targets: star,
        duration: 500 + Math.random() * 1000,
        alpha: 0,
        yoyo: true,
        repeat: -1
      });
    }
  }

  // Event emitted from the PhaserGame component
  const currentScene = (scene) => {

    setCanMoveSprite(scene.scene.key !== 'MainMenu');

  }

  return (
    <>

      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />

      <div>
        <div>
          <button className="button" onClick={changeScene}>Change Scene</button>
        </div>
        <div>
          <button disabled={canMoveSprite} className="button" onClick={moveSprite}>Toggle Movement</button>
        </div>
        <div className="spritePosition">Sprite Position:
          <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
        </div>
        <div>
          <button className="button" onClick={addSprite}>Add New Sprite</button>
        </div>
      </div>
    </>
  )

}
