import { useState, useRef } from "react";
import Phaser, { Scene } from "phaser";
import { PhaserGame } from "./render_components/PhaserGame";

export const Crimsonveil = () => {
  //tutaj dodajemy kod kiedy chcemy polaczyc iu z gra
  //tj. np dodawac z poziomu button jakis element do gry

  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [playerEquipment, setPlayerEquipment] = useState();

  const phaserRef = useRef();

  //console.log(config_phaser);

  const playerP = () => {
    const scene = phaserRef.current?.scene;

    if (scene && scene.scene.key === "Game" && scene.player) {
      const { x, y } = scene.player;
      setPlayerPosition({ x, y });
    }
  };

  const GetPlayerEquipment = () => {
    const scene = phaserRef.current?.scene;

    if (scene && scene.scene.key === "Game" && scene.player) {
      scene.player.showEquipment();
    }
  };

  return (
    <>
      <PhaserGame ref={phaserRef} />
      <button onClick={playerP}>Pobierz pozycję gracza</button>
      <p>
        Pozycja gracza: x={playerPosition.x}, y={playerPosition.y}
      </p>

      <button onClick={GetPlayerEquipment}>Pobierz eq gracza</button>
    </>
  );
};
