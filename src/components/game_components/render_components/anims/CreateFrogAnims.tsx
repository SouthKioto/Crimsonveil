import Phaser from "phaser";

export const CreateFrogAnims = (anim: Phaser.Animations.AnimationManager) => {

  //frog_blueblue
  anim.create({
    key: 'frog_blueblue_hop',
    frames: anim.generateFrameNumbers('frog_blueblue', { start: 9, end: 15 }),
    frameRate: 10,
    repeat: -1,
  })

  anim.create({
    key: 'frog_blueblue_stay',
    frames: anim.generateFrameNumbers('frog_blueblue', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  })

  anim.create({
    key: 'frog_blueblue_attack',
    frames: anim.generateFrameNumbers('frog_blueblue', { start: 17, end: 22 }),
    frameRate: 10,
    repeat: -1
  })


  //frog_bluebrown

  anim.create({
    key: 'frog_bluebrown_hop',
    frames: anim.generateFrameNumbers('frog_bluebrown', { start: 9, end: 15 }),
    frameRate: 10,
    repeat: -1,
  })

  anim.create({
    key: 'frog_bluebrown_stay',
    frames: anim.generateFrameNumbers('frog_bluebrown', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  })

  anim.create({
    key: 'frog_bluebrown_attack',
    frames: anim.generateFrameNumbers('frog_bluebrown', { start: 17, end: 22 }),
    frameRate: 10,
    repeat: -1
  })

  //frog_greenblue

  anim.create({
    key: 'frog_greenblue_hop',
    frames: anim.generateFrameNumbers('frog_greenblue', { start: 9, end: 15 }),
    frameRate: 10,
    repeat: -1,
  })

  anim.create({
    key: 'frog_greenblue_stay',
    frames: anim.generateFrameNumbers('frog_greenblue', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  })

  anim.create({
    key: 'frog_greenblue_attack',
    frames: anim.generateFrameNumbers('frog_greenblue', { start: 17, end: 22 }),
    frameRate: 10,
    repeat: -1
  })

  //frog_greenbrown

  anim.create({
    key: 'frog_greenbrown_hop',
    frames: anim.generateFrameNumbers('frog_greenbrown', { start: 9, end: 15 }),
    frameRate: 10,
    repeat: -1,
  })

  anim.create({
    key: 'frog_greenbrown_stay',
    frames: anim.generateFrameNumbers('frog_greenbrown', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  })

  anim.create({
    key: 'frog_greenbrown_attack',
    frames: anim.generateFrameNumbers('frog_greenbrown', { start: 17, end: 22 }),
    frameRate: 10,
    repeat: -1
  })

  //frog_purpleblue

  anim.create({
    key: 'frog_purpleblue_hop',
    frames: anim.generateFrameNumbers('frog_purpleblue', { start: 9, end: 15 }),
    frameRate: 10,
    repeat: -1,
  })

  anim.create({
    key: 'frog_purpleblue_stay',
    frames: anim.generateFrameNumbers('frog_purpleblue', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  })

  anim.create({
    key: 'frog_purpleblue_attack',
    frames: anim.generateFrameNumbers('frog_purpleblue', { start: 17, end: 22 }),
    frameRate: 10,
    repeat: -1
  })

  //frog_purplebrown

  anim.create({
    key: 'frog_purplewhite_hop',
    frames: anim.generateFrameNumbers('frog_purplewhite', { start: 9, end: 15 }),
    frameRate: 10,
    repeat: -1,
  })

  anim.create({
    key: 'frog_purplewhite_stay',
    frames: anim.generateFrameNumbers('frog_purplewhite', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  })

  anim.create({
    key: 'frog_purplebrown_attack',
    frames: anim.generateFrameNumbers('frog_purplewhite', { start: 17, end: 22 }),
    frameRate: 10,
    repeat: -1
  })

}

