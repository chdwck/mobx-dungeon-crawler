import { action, extendObservable, computed } from 'mobx';
import TheHero from './characters/TheHero';
import { firstRoom, createDungeon, placeWalls} from './DungeonGenerator';
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
      gameLevel: 1,
      playerLevel: computed(() => {
        let exp = this.hero.exp;
        let level=1;
        while (exp >= 100) {
          exp -= (level * 100);
          if (exp >= 0) level++;
        }
        return level;
      }),

      expTillNext: computed(() => {
        let total = 0;
        for (let i = 1; i <= this.playerLevel; i++) {
          total += (i * 100);
        }
        return total - this.hero.exp;
      }),

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
          }
          this.moveCharacter();
        })
      }),

      checkNextTile: action((nextTile) => {
        const monster = "Mygo" || "Abomination" || "Skraw" || "ArachnaDemos";
        switch (nextTile.type) {
          case 'floor':
            return true;
          case "Mygo":
          case "Abomination":
          case "Skraw":
          case "ArachnaDemos":
            return this.fightMonster(nextTile);
          case 'Boss':
          case 'BossArea':
            this.fightBoss();
            break;
          case 'health':
            return this.pickUpHealth(nextTile.healthAmt);
          case 'weapon':
            return this.pickUpWeapon(nextTile.weapon);
          case 'portal':
            this.gameLevel++;
            this.compiledCreation();
            break;
        }
      }),

      pickUpWeapon:action((weapon) => {
        return true;
      }),

      syncStoreWithPos: action(() => {
        this.xPos = firstRoom.x;
        this.yPos = firstRoom.y;
        this.grid[0][0] = { type: 'cell' };
      }),

      pickUpHealth: action((healthAmt) => {
        this.hero.health += healthAmt;
        return true;
      }),

      placePortal: action(() => {
        if (this.portalRoom === undefined) {
          this.compiledCreation();
          return null;
        }
        const { x, y, width, height } = this.portalRoom;
        let finalX = x + (chop(width) - 1);
        let finalY = y - (chop(height) - height);
        this.grid[finalY][finalX] = { type: 'portal' };
      }),

      placeBossRoom: action(() => {
        if (this.portalRoom === undefined) {
          this.compiledCreation();
          return null;
        }
        const { x, y, width, height } = this.portalRoom;
        const { BossHeight, BossWidth, stats } = FinalBoss;
        this.prepareBossRoom(x, y, width, height);
        let finalX = x + (chop(width)) - 2;
        let finalY = y - (chop(height) - height);
        for (let i = finalY; i < BossHeight + finalY; i++) {
          for (let j = finalX; j < BossWidth + finalX; j++) {
            this.grid[i][j] = { type: 'BossArea', monsterClass: stats }
          }
        }
        this.grid[finalY][finalX] = {type: 'Boss', monsterClass: stats}
      }),
      prepareBossRoom: action((x, y, width, height) => {
        for (let i = y; i < y + height + 2; i++){
          for (let j = x; j < x + width + 2; j++){
            placeWalls(this.grid, i , j);
            this.grid[i][j] = {type: 'floor', id: 'P' };
          }
        }
      }),

      moveCharacter: action(() => {
        const {x, y} = this.previousTile;
        this.grid[this.yPos][this.xPos] = { type: "hero"};
        if (this.xPos !== x || this.yPos !== y) this.grid[y][x] = { type: 'floor' };
      }),

      fightMonster: action((tile) => {
        console.log(tile.x, tile.y);
          const monster = tile.monsterClass;
          monster.health -= this.hero.atk;
          this.hero.health -= monster.atk;
          if (this.hero.health <= 0) {
            alert('You died.');
            this.resetGame();
          }
          else if (monster.health <= 0) {
            this.hero.exp += monster.expGain;
            return this.weaponDrop(tile);
          }

      }),

      weaponDrop: action((tile) => {
        const { x,y } = tile;
        if (Math.random() * 100 < 40) {
          console.log('fired');
          this.grid[y][x] = { type: 'weapon' };
          return false;
        }
        return true;
      }),

      fightBoss: action(() => {
        this.fightMonster(this.boss);
        if (this.boss.health <= 0) {
          alert('You win');
          this.resetGame();
        }
      }),

      compiledCreation: action(() => {
        this.makeCurrentDungeon();
        this.syncStoreWithPos();
        (this.gameLevel === 5)
          ? this.placeBossRoom() : this.placePortal();
      }),
      resetGame: action(() => {
        this.compiledCreation();
        this.hero = TheHero;
        this.gameLevel = 1;
      })
    })
  }
}

export default new MainStore();
