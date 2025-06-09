import { useState, useRef } from "react";
import Phaser, { Scene } from "phaser";
import { PhaserGame } from "./render_components/PhaserGame";
import { Equipment_Ui } from "../react-game-ui/elements/Equipment_Ui";

export const Crimsonveil = () => {
  //tutaj dodajemy kod kiedy chcemy polaczyc iu z gra
  //tj. np dodawac z poziomu button jakis element do gry

  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [playerEquipment, setPlayerEquipment] = useState();
  const [showEquipment, setShowEquipment] = useState(false);

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

  const showEquipmentUi = () => {
    const scene = phaserRef.current?.scene;
    setShowEquipment(!showEquipment);

    console.log(scene.player._equipment);
  };

  return (
    <>
      <PhaserGame ref={phaserRef} />
      <button onClick={playerP}>Pobierz pozycję gracza</button>
      <p>
        Pozycja gracza: x={playerPosition.x}, y={playerPosition.y}
      </p>

      <button onClick={showEquipmentUi}>Pobierz eq gracza</button>

      {showEquipment ? <Equipment_Ui /> : <></>}
    </>
  );
};
