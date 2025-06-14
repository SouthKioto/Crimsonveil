import Phaser from "phaser";

export const CreateFrogAnims = (anim: Phaser.Animations.AnimationManager) => {

  anim.create({
    key: 'frog_hop',
    frames: anim.generateFrameNumbers('frog', { start: 9, end: 15 }),
    frameRate: 10,
    repeat: -1,
  })

  anim.create({
    key: 'frog_stay',
    frames: anim.generateFrameNumbers('frog', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  })

}


