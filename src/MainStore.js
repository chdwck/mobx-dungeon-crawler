import { action, extendObservable } from 'mobx';
import TheHero from './characters/TheHero';
import { firstRoom, createDungeon} from './DungeonGenerator';
import FinalBoss from './characters/finalBoss';

const chop = (num) => Math.ceil(num / 2);

export class MainStore {
  constructor() {
    extendObservable(this, {
      hero: TheHero,
      boss: FinalBoss.stats,
      grid: [],
      portalRoom: {},
      xPos: 0,
      yPos: 0,
      previousTile:{ x: 0, y: 0 },
      currentLevel: 1,

      makeCurrentDungeon: action(() => {
        const currentDungeon = createDungeon();
        this.grid = currentDungeon.grid;
        this.portalRoom = currentDungeon.portalRoom;
      }),

      trackPosition: action(() => {
        window.addEventListener('keydown', (e) => {
          e.preventDefault();
          this.previousTile = { y: this.yPos, x: this.xPos };
          switch (e.keyCode) {
            case 37:
              if (this.checkNextTile(this.grid[this.yPos][this.xPos-1])) this.xPos -= 1;
              break;
            case 38:
              if (this.checkNextTile(this.grid[this.yPos-1][this.xPos])) this.yPos -= 1;
              break;
            case 39:
              if (this.checkNextTile(this.grid[this.yPos][this.xPos+1])) this.xPos += 1;
              break;
            case 40:
              if (this.checkNextTile(this.grid[this.yPos+1][this.xPos])) this.yPos += 1;
              break;
            default:
              console.log("Not a relevant keyCode");
          }
          this.moveCharacter();
        })
      }),

      checkNextTile(nextTile) {
        switch (nextTile.type) {
          case 'floor':
            return true;
          case 'monster':
            return this.fightMonster(nextTile.monsterClass);
          case 'Boss':
            this.fightBoss();
            break;
          case 'health':
            return this.pickUpHealth(nextTile.healthAmt);
          case 'portal':
            this.currentLevel++;
            this.compiledCreation();
            break;
          default:
             console.log("probably a wall");
        }
      },

      syncStoreWithPos: action(() => {
        this.xPos = firstRoom.x;
        this.yPos = firstRoom.y;
      }),

      pickUpHealth: action((healthAmt) => {
        this.hero.health += healthAmt;
        return true;
      }),

      placePortal: action(() => {
        const { x, y, width, height } = this.portalRoom;
        let finalX = x + (chop(width) - 1);
        let finalY = y - (chop(height) - height);
        this.grid[finalY][finalX] = { type: 'portal' };
      }),

      placeBossRoom: action(() => {
        const { x, y, width, height } = this.portalRoom;
        const { BossHeight, BossWidth, stats } = FinalBoss;
        this.prepareBossRoom(x, y, width, height);
        let finalX = x + (chop(width) - 1);
        let finalY = y - (chop(height) - height);
        for (let i = finalY; i < BossHeight + finalY; i++) {
          for (let j = finalX; j < BossWidth + finalX; j++) {
            this.grid[i][j] = { type: 'Boss', monsterClass: stats }
          }
        }

      }),
      prepareBossRoom: action((x, y, width, height) => {
        for (let i = y; i < y + height + 1; i++){
          for (let j = x; j < x + width + 1; j++){
            this.grid[i][j] = {type: 'floor', id: 'P' }
          }
        }
      }),

      moveCharacter: action(() => {
        const {x, y} = this.previousTile;
        this.grid[this.yPos][this.xPos] = { type: "hero"};
        if (this.xPos !== x || this.yPos !== y) this.grid[y][x] = { type: 'floor' };
        this.grid[0][0] = { type: 'cell' };
      }),

      fightMonster: action((monster) => {
          monster.health -= this.hero.atk;
          this.hero.health -= monster.atk;
        if (monster.health <= 0) {
          this.hero.exp += monster.expGain;
          return true;
        } else if(this.hero.health <= 0){
          alert('You died');
          this.resetGame();
        }
      }),

      fightBoss: action(() => {
        if (this.fightMonster(this.boss)) {
          alert('You win!');
        }
      }),

      compiledCreation: action(() => {
        this.makeCurrentDungeon();
        this.syncStoreWithPos();
        (this.currentLevel === 2)
          ? this.placeBossRoom() : this.placePortal();
      }),
      resetGame: action(() => {
        this.compiledCreation();
        this.hero = TheHero;
        this.currentLevel = 1;
      })
    })
  }
}

export default new MainStore();
