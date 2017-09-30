import _ from 'lodash';
import config from './gridConfig';
import Monsters from './characters/Monsters';

const [min, max] = config.ROOM_SIZE_RANGE;

export const firstRoom = {
      x: _.random(1, config.GRID_WIDTH - max - 15),
      y: _.random(1, config.GRID_HEIGHT - max - 15),
      height: _.random(min, max),
      width: _.random(min, max),
      id: '0'
    };

const placeCells = (grid, {x, y, width = 1, height = 1, id}, type = 'floor') => {
  for (let i = y; i < y + height; i++) {
    for (let j = x; j < x + width; j++) {
      let mIndex = _.random(0, 3);
      switch (type) {
        case 'floor':
          grid[i][j] = { type, id };
          break;
        case 'monster':
          grid[i][j] = { type, monsterClass: Monsters[mIndex], x:j, y:i};
          break;
        case 'health':
          grid[i][j] = { type, healthAmt: 10 };
          break;
        default:
          console.log('Not an option');
      }
    }
  }
  return grid;
};

const placeHero = (grid) => {
  grid[firstRoom.y][firstRoom.x] = { type: "hero" };
  return grid;
}

const growMap = (grid, seedRooms, counter = 1, maxRooms = config.MAX_ROOMS) => {
  if (counter + seedRooms.length > maxRooms || !seedRooms.length) {
    const portalRoom = seedRooms[seedRooms.length - 1]
    return { grid, portalRoom }
  }
  else {
      grid = createRoomsFromSeed(grid, seedRooms.pop());
      seedRooms.push(...grid.placedRooms);
      counter += grid.placedRooms.length;
      return growMap(grid.grid, seedRooms, counter);
  }
};

const isValidRoomPlacement = (grid, {x, y, width = 1, height = 1}) => {
  if (y < 1 || y + height > grid.length - 1 ) {
    return false;
  }
  else if (x < 1 || x + width > grid[0].length -1) {
    return false;
  }

  for (let i = y - 1; i < y + height + 1; i++) {
    for (let j = x - 1; j < x + width + 1; j++) {
      if (grid[i][j].type === 'floor') {
        return false;
      }
    }
  }
  return true;
}

const createRoomsFromSeed = (grid, {x, y, width, height}, range = config.ROOM_SIZE_RANGE) => {
		const [min, max] = range;
	  const roomValues = [];
		const north = { height: _.random(min, max), width: _.random(min, max) };
		north.x = _.random(x, x + width - 1);
		north.y = y - north.height - 1;
		north.doorx = _.random(north.x, (Math.min(north.x + north.width, x + width)) - 1);
		north.doory = y - 1;
    north.monsterA = {
      x:_.random(north.x + 1, north.x + north.width - 1),
      y:_.random(north.y, north.y + north.height -1)
    };
    north.monsterB = {
      x:_.random(north.x, north.x +north.width - 1),
      y:_.random(north.y, north.y + north.height -1)
     };
    north.healthPu = {
      x:_.random(north.x, north.x +north.width - 1),
      y:_.random(north.y, north.y + north.height -1)
    };
		north.id='N';
		roomValues.push(north);

		const east = { height: _.random(min, max), width: _.random(min, max) };
		east.x = x + width + 1;
		east.y = _.random(y, height + y - 1);
		east.doorx = east.x - 1;
		east.doory = _.random(east.y, (Math.min(east.y + east.height, y + height)) - 1);
    east.monsterA = {
      x:_.random(east.x, east.x + east.width - 1),
      y:_.random(east.y, east.y + east.height -1)
    };
    east.monsterB = {
      x:_.random(east.x, east.x + east.width - 1),
      y:_.random(east.y, east.y + east.height -1)
     };
     east.healthPu = {
       x:_.random(east.x, east.x + east.width - 1),
       y:_.random(east.y, east.y + east.height -1)
      };
    east.id='E';
		roomValues.push(east);

		const south = { height: _.random(min, max), width: _.random(min, max) };
		south.x = _.random(x, width + x - 1);
		south.y = y + height + 1;
		south.doorx = _.random(south.x, (Math.min(south.x + south.width, x + width)) - 1);
		south.doory = y + height;
    south.monsterA = {
      x:_.random(south.x, south.x + south.width - 1),
      y:_.random(south.y + 1, south.y + south.height -1)
    };
    south.monsterB = {
      x:_.random(south.x, south.x + south.width - 1),
      y:_.random(south.y, south.y + south.height -1)
     };
     south.healthPu = {
       x:_.random(south.x, south.x + south.width - 1),
       y:_.random(south.y, south.y + south.height -1)
      };
		south.id='S';
		roomValues.push(south);

		const west = { height: _.random(min, max), width: _.random(min, max) };
		west.x = x - west.width - 1;
		west.y = _.random(y, height + y - 1);
		west.doorx = x - 1;
		west.doory = _.random(west.y, (Math.min(west.y + west.height, y + height)) - 1);
    west.monsterA = {
      x:_.random(west.x, west.x + west.width - 1),
      y:_.random(west.y, west.y + west.height -1)
     };
    west.monsterB = {
      x:_.random(west.x, west.x + west.width - 1),
      y:_.random(west.y, west.y + west.height -1)
    };
    west.healthPu = {
      x:_.random(west.x, west.x + west.width - 1),
      y:_.random(west.y, west.y + west.height -1)
    };
    west.id='W';
		roomValues.push(west);

		const placedRooms = [];
		roomValues.forEach(room => {
			if (isValidRoomPlacement(grid, room)) {
				grid = placeCells(grid, room);
				grid = placeCells(grid, {x: room.doorx, y: room.doory}, 'floor');
        grid = placeCells(grid, room.monsterA, 'monster');
        grid = placeCells(grid, room.monsterB, 'monster');
        grid = placeCells(grid, room.healthPu, 'health');
				placedRooms.push(room);
			}
		});

		return {grid, placedRooms};
  };

export const createDungeon = () => {
  let grid = [];
  for (let i = 0; i < config.GRID_HEIGHT; i++) {
    grid.push([]);
    for (let j = 0; j< config.GRID_WIDTH; j++) {
      grid[i].push({type: 0, opacity: _.random(0.3, 0.8)});
    }
  }
  grid = placeCells(grid, firstRoom);
  placeHero(grid, firstRoom);
  return growMap(grid, [firstRoom]);
}
