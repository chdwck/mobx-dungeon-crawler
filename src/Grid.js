import React, { Component } from 'react';
import { createDungeon } from './DungeonGenerator';
import { observer } from 'mobx-react';
import './styles/Grid.css';


const Dungeon = observer(class Dungeon extends Component {
  componentDidMount() {
    this.props.store.trackPosition();
    this.props.store.compiledCreation();
  }

  render() {
    const cells = this.props.store.grid.map((el, i) => {
      return(
        <div className="row" key={i + el}>
          {
            el.map((cell, i) => {
              return(
                <div
                  className={(cell.type === 'floor' || cell.type === 'door' || cell.type === 'hero' || cell.type === 'portal') ? 'cell ' + cell.type : 'cell'}
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
