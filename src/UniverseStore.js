import { action, extendObservable } from 'mobx';
import _ from 'lodash';
import config from './gridConfig';

const [min, max] = config.ROOM_SIZE_RANGE;
const chop = (num) => Math.ceil(num / 2);

export class UniverseStore {
  constructor() {
    extendObservable(this, {
      xPos: null,
      portalRoom: {},
      yPos: null,
      previousTile:{ x: 0, y: 0 },
      firstRoom: {
          x: _.random(1, config.GRID_WIDTH - max - 15),
          y: _.random(1, config.GRID_HEIGHT - max - 15),
          height: _.random(min, max),
          width: _.random(min, max),
          id: '0'
        },

      trackPosition: action((grid) => {
        window.addEventListener('keydown', (e) => {
          e.preventDefault();
          this.previousTile = { y: this.yPos, x: this.xPos};
          switch (e.keyCode) {
            case 37:
              if (grid[this.yPos][this.xPos-1].type === 'floor') this.xPos -= 1;
              break;
            case 38:
              if (grid[this.yPos-1][this.xPos].type === 'floor') this.yPos -= 1;
              break;
            case 39:
              if (grid[this.yPos][this.xPos+1].type === 'floor') this.xPos += 1;
              break;
            case 40:
              if (grid[this.yPos+1][this.xPos].type === 'floor') this.yPos += 1;
              break;
            default:
              console.log("Not a relevant keyCode");
          }
          console.log("keystroke")
        })
      }),

      syncStoreWithPos: action(() => {
        this.xPos = this.firstRoom.x;
        this.yPos = this.firstRoom.y;
      }),

      placePortal: action((grid) => {
        const { x, y, width, height } = this.portalRoom;
        let finalX = x + (chop(width) - 1);
        let finalY = y - (chop(height) - height);
        grid[finalY][finalX] = { type: 'portal' };
      }),
    })
  }
}

export default new UniverseStore();
