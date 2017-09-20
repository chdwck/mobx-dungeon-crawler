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



export const createDungeon = () => {
  console.log(firstRoom);
  let grid = [];
  for (let i = 0; i < c.GRID_HEIGHT; i++) {
    grid.push([]);
    for (let j = 0; j< c.GRID_WIDTH; j++) {
      grid[i].push({type: 0, opacity: _.random(0.3, 0.8)});
    }
  }
  return placeCells(grid, firstRoom);
}
