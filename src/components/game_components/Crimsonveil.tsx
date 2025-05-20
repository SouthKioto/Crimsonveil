
import { useState, useRef } from "react";
import Phaser, { Scene } from 'phaser';
import { PhaserGame } from "./render_components/PhaserGame";
import { config_phaser } from "./render_components/config_phaser.jsx"


export const Crimsonveil = () => {
  //tutaj dodajemy kod kiedy chcemy polaczyc iu z gra
  //tj. np dodawac z poziomu button jakis element do gry

  console.log(config_phaser)

  return (
    <>
      <PhaserGame config={config_phaser} />
    </>
  )
}
