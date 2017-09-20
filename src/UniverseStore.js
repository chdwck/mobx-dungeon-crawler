import { computed, observable, action, extendObservable } from 'mobx';
import React from 'react';
import { TweenLite } from 'gsap';

export class UniverseStore {
  constructor() {
    extendObservable(this, {
      xPos: 100,
      yPos: 100,
      alive: true,

      moveCharacter: action((dir) => {
        switch (dir) {
          case 'up':
            this.yPos = this.yPos - 20;
            break;
          case 'down':
            this.yPos = this.yPos + 20;
            break;
          case 'left':
            this.xPos = this.xPos - 20;
            break;
          case 'right':
            this.xPos = this.xPos + 20;
            break;
          default:
            console.log('Not a Valid direction.');
        };

        TweenLite.to('.TheHero', 0, {left: this.xPos, top: this.yPos });
      }),


    })
  }
}

export default new UniverseStore();
