import Phaser from "phaser";

export const CreatePlayerAnims = (anim: Phaser.Animations.AnimationManager) => {
  anim.create({
    key: "idle",
    frames: anim.generateFrameNumbers('player', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1,
  })

  anim.create({
    key: "walking",
    frames: anim.generateFrameNumbers('player', { start: 9, end: 16 }),
    frameRate: 10,
    repeat: -1
  })

  anim.create({
    key: 'attack',
    frames: anim.generateFrameNumbers('player', { start: 18, end: 23 }),
    frameRate: 10,
    repeat: 1
  })


}


