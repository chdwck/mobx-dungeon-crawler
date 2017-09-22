import React, { Component } from 'react';
import { createDungeon } from './DungeonGenerator';
import { observer } from 'mobx-react';
import './styles/Grid.css';


const Dungeon = observer(class Dungeon extends Component {
  constructor(props) {
    super(props);
    this.grid = createDungeon();
    props.store.syncStoreWithPos();
  }

  componentDidMount() {
    this.props.store.trackPosition(this.grid);
  }

  moveCharacter() {
    const { xPos, yPos, previousTile } = this.props.store;
    const {x, y} = previousTile;
    this.grid[yPos][xPos] = { type: "hero"};
    if (xPos !== x || yPos !== y) this.grid[y][x] = { type: 'floor' };
    this.grid[0][0] = { type: 'cell' };
  }

  render() {
    this.moveCharacter();
    const cells = this.grid.map((el, i) => {
      return(
        <div className="row" key={i + el}>
          {
            el.map((cell, i) => {
              return(
                <div
                  className={(cell.type === 'floor' || cell.type === 'door' || cell.type === 'hero') ? 'cell ' + cell.type : 'cell'}

                  key={i}
                ></div>
              );
            })
          }
        </div>
      );
    });

    return(
      <div className="Dungeon">
        <div className="flex-container">
          { cells }
        </div>
      </div>
    );
  }
})

export default Dungeon;
