enum potionSize {
  SMALL,
  MEDIUM,
  LARGE,
}

export class Potion {
  protected _duration: number;
  protected _size: string;

  constructor(duration: number, size: string) {
    this._size = size;
    this._duration = duration;
  }

  get size() {
    return this._size;
  }

  get duration() {
    return this._duration;
  }

  increaseDuration(value: number) {
    this._duration += value;
  }

  changeSize() {
    let pSize = Phaser.Math.Between(0, 2);
    this._size = potionSize[pSize];
  }
}
