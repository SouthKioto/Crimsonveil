enum Weapon_Rarity {
  COMMON,
  RARE,
  EPIC,
  LEGENDARY
}


// Damage by sword rarity:
// COMMON: dmg between 1 - 5, multiplier between 0.2 - 0.8 
// RARE: dmg between 6 - 10, multiplier between 0.9 - 1.6
// EPIC: dmg between 10 - 16, multiplier between 1.7 - 2.5
// LEGENDARY: dmg between 20 - 25, multiplier between 2.5 - 2.8

const random_rarity = (): string => {
  return Weapon_Rarity[Phaser.Math.Between(0, 3)];
}

const random_damage = (rarity: string): number => {
  let damage_by_rarity: number;
  damage_by_rarity = 0;

  if (rarity == null || rarity == "undefined") return;

  if (rarity === "COMMON") {
    damage_by_rarity = Phaser.Math.Between(1, 5);
  } else if (rarity === "RARE") {
    damage_by_rarity = Phaser.Math.Between(6, 10);
  } else if (rarity === "EPIC") {
    damage_by_rarity = Phaser.Math.Between(10, 16);
  } else if (rarity === "LEGENDARY") {
    damage_by_rarity = Phaser.Math.Between(20, 25);
  }

  return damage_by_rarity
  //return parseFloat((Math.random() * 16).toFixed(2));
}

const random_damage_multi = (rarity: string): number => {
  let damage_multi_by_rarity: number;
  damage_multi_by_rarity = 0;

  if (rarity == null || rarity == "undefined") return;

  if (rarity === "COMMON") {
    damage_multi_by_rarity = parseFloat(Phaser.Math.FloatBetween(0.2, 0.8).toFixed(1));
  } else if (rarity === "RARE") {
    damage_multi_by_rarity = parseFloat(Phaser.Math.FloatBetween(0.9, 1.6).toFixed(1));
  } else if (rarity === "EPIC") {
    damage_multi_by_rarity = parseFloat(Phaser.Math.FloatBetween(1.7, 2.5).toFixed(1));
  } else if (rarity === "LEGENDARY") {
    damage_multi_by_rarity = parseFloat(Phaser.Math.FloatBetween(2.5, 2.8).toFixed(1));
  }

  return damage_multi_by_rarity;
}


export class Weapon {
  protected _rarity: string;
  protected _weapon_type: string;
  protected _damage: number;
  protected _damage_multi: number;

  constructor(weapon_type: string) {
    this._weapon_type = weapon_type;
    this._rarity = random_rarity();
    this._damage = random_damage(this._rarity);
    this._damage_multi = random_damage_multi(this._rarity);
  }

  get damage() {
    return parseFloat((this._damage * this._damage_multi).toFixed(2)) + this._damage;
  }

  getWeaponInfo() {
    const obj = {
      type: this._weapon_type,
      rarity: this._rarity,
      damage: this._damage,
      damage_multi: this._damage_multi,
      calc_dmg: this.damage,
    }

    console.log(obj);
  }
}

