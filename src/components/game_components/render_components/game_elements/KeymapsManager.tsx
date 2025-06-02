import Phaser from 'phaser'
import type { ParamKeyValuePair } from 'react-router-dom';

type Keymaps = Record<string, string>
type KeyBindings = Record<string, Phaser.Input.Keyboard.Key>

export class KeymapsManager {

  private keymaps: Keymaps;
  private keyBindings: KeyBindings;

  constructor(keymaps: Keymaps = {}) {
    this.ValidateKeymaps(keymaps)
    this.keymaps = keymaps;
  }

  registerKeys(input: Phaser.Input.Keyboard.KeyboardPlugin): void {
    this.keyBindings = {};

    for (const action in this.keymaps) {
      const keyName = this.keymaps[action].toUpperCase()
      const keyKode = Phaser.Input.Keyboard.KeyCodes[keyName];

      if (keyKode) {
        this.keyBindings[action] = input.addKey(keyKode);
      } else {
        console.warn(`Nieznany klawisz ${keyName}`);
      }
    }
  }

  getKey(action: string): Phaser.Input.Keyboard.Key | undefined {
    return this.keyBindings[action];
  }

  setKeymaps(newKeymaps: Keymaps): void {
    this.ValidateKeymaps(newKeymaps);
    this.keymaps = newKeymaps;
  }

  getKeymaps(): Keymaps {
    return this.keymaps;
  }

  private ValidateKeymaps(obj: any): void {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
      throw new Error('Keymaps musza byc obiektem json');
    }
  }
}
