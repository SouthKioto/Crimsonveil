import { forwardRef, useEffect, useLayoutEffect, useRef } from "react"
import { EventBus } from "./EventBus"
import { StartGame } from "./config_phaser.jsx"

export const PhaserGame = ({ config }) => {

  useEffect(() => {
    const game = new Phaser.Game(config)


    return () => {
      game.destroy(true)
    }

  }, [])

  return (
    <div id="game-container"></div>
  )

}
