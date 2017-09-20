import React, { Component } from 'react';
import { createDungeon } from './DungeonGenerator';
import './styles/Grid.css';


export default class Dungeon extends Component {
  render() {
    let dungeon = createDungeon();

    const cells = dungeon.map((el, i) => {
      return(
        <div className="row" key={i + el}>
          {
            el.map((cell, i) => {
              return(
                <div
                  className={(cell.type == 'floor' || cell.type == 'door') ? 'cell ' + cell.type : 'cell'}
                  style={{opacity: cell.opacity}}
                  key={i}
                >
                  {cell.id}
                </div>
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
}
