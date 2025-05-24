import Phaser from "phaser";

export const CreateFrogAnims = (anim: Phaser.Animations.AnimationManager) => {

  anim.create({
    key: 'frog_hop',
    frames: anim.generateFrameNumbers('frog', { start: 0, end: 6 }),
    frameRate: 10,
    repeat: -1,
  })

}


