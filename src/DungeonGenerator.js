import _ from 'lodash';

const GRID_HEIGHT = 40;
const GRID_WIDTH = 40;
const MAX_ROOMS = 15;
const ROOM_SIZE_RANGE = [7,12];

const c = { GRID_HEIGHT, GRID_WIDTH, MAX_ROOMS, ROOM_SIZE_RANGE };

const [min, max] = c.ROOM_SIZE_RANGE;

const firstRoom = {
  x: _.random(1, c.GRID_WIDTH - max - 15),
  y: _.random(1,c.GRID_HEIGHT - max - 15),
  height: _.random(min, max),
  width: _.random(min, max),
  id: '0'
};

const placeCells = (grid, {x, y, width = 1, height = 1, id}, type = 'floor') => {
  for (let i = y; i < y + height; i++) {
    for (let j = x; j < x + width; j++) {
      grid[i][j] = {type, id};
    }
  }
  return grid;
};

const growMap = (grid, seedRooms, counter = 1, maxRooms = c.MAX_ROOMS) => {
  if (counter + seedRooms.length > maxRooms || !seedRooms.length) {
    return grid;
  }

  grid = createRoomsFromSeed(grid, seedRooms.pop());
  seedRooms.push(...grid.placedRooms);
  counter += grid.placedRooms.length;
  return growMap(grid.grid, seedRooms, counter);
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
        return false
      }
    }
  }
  return true;
}


const createRoomsFromSeed = (grid, {x, y, width, height}, range = c.ROOM_SIZE_RANGE) => {
		// range for generating the random room heights and widths
		const [min, max] = range;

		// generate room values for each edge of the seed room
		const roomValues = [];

		const north = { height: _.random(min, max), width: _.random(min, max) };
		//dont get confused about the height and width property when declaring a room.

		//the x,y,height and width we use from now on are the ones
		//we pass in the initial function declaration createRoomsFromSeed()

		north.x = _.random(x, x + width - 1);
		north.y = y - north.height - 1;
		north.doorx = _.random(north.x, (Math.min(north.x + north.width, x + width)) - 1);
		north.doory = y - 1;
		north.id='N';
		roomValues.push(north);

		const east = { height: _.random(min, max), width: _.random(min, max) };
		east.x = x + width + 1;
		east.y = _.random(y, height + y - 1);
		east.doorx = east.x - 1;
		east.doory = _.random(east.y, (Math.min(east.y + east.height, y + height)) - 1);
		east.id='E';
		roomValues.push(east);

		const south = { height: _.random(min, max), width: _.random(min, max) };
		south.x = _.random(x, width + x - 1);
		south.y = y + height + 1;
		south.doorx = _.random(south.x, (Math.min(south.x + south.width, x + width)) - 1);
		south.doory = y + height;
		south.id='S';
		roomValues.push(south);

		const west = { height: _.random(min, max), width: _.random(min, max) };
		west.x = x - west.width - 1;
		west.y = _.random(y, height + y - 1);
		west.doorx = x - 1;
		west.doory = _.random(west.y, (Math.min(west.y + west.height, y + height)) - 1);
		west.id='W';
		roomValues.push(west);

		const placedRooms = [];
		roomValues.forEach(room => {
			if (isValidRoomPlacement(grid, room)) {
				// place room
				grid = placeCells(grid, room);
				// place door
				grid = placeCells(grid, {x: room.doorx, y: room.doory}, 'door');
				// need placed room values for the next seeds
				placedRooms.push(room);
			}
		});

		//it returns an object --> {}
		return {grid, placedRooms};
  };



export const createDungeon = () => {
  let grid = [];
  for (let i = 0; i < c.GRID_HEIGHT; i++) {
    grid.push([]);
    for (let j = 0; j< c.GRID_WIDTH; j++) {
      grid[i].push({type: 0, opacity: _.random(0.3, 0.8)});
    }
  }
  grid = placeCells(grid, firstRoom);
  return growMap(grid, [firstRoom]);
}
