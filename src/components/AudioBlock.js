import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Song from "../gameElements/gameMusic.ogg";
import Mygo from "../gameElements/monster1.ogg";
import Skraw from "../gameElements/monster2.ogg";
import ArachnaDemos from "../gameElements/monster3.ogg";
import Abomination from "../gameElements/monster4.ogg";
import health from "../gameElements/health.ogg";
import punch from "../gameElements/punch.ogg";
import slice from "../gameElements/slice.ogg";
import walk from "../gameElements/walk.ogg";
import cthuluWarn from "../gameElements/cthuluWarn.ogg";
import cthuluEnd from "../gameElements/cthuluEnd.ogg";
import pickUpSword from "../gameElements/pickUpSword.ogg";
import portal from "../gameElements/portal.ogg";
import Opener from "../gameElements/opener.ogg";
import Confirm from "../gameElements/confirm.ogg";

const AudioBlock = observer(class AudioBlock extends Component {
  render() {
    return(
      <div>
        <audio id="Song">
          <source src={Song} type="audio/ogg" />
        </audio>
        <audio id="Confirm">
          <source src={Confirm} type="audio/ogg" />
        </audio>
        <audio id="Opener">
          <source src={Opener} type="audio/ogg" />
        </audio>
        <audio id="Mygo">
          <source src={Mygo} type="audio/ogg" />
        </audio>
        <audio id="Skraw">
          <source src={Skraw} type="audio/ogg" />
        </audio>
        <audio id="ArachnaDemos">
          <source src={ArachnaDemos} type="audio/ogg" />
        </audio>
        <audio id="Abomination">
          <source src={Abomination} type="audio/ogg" />
        </audio>
        <audio id="health">
          <source src={health} type="audio/ogg" />
        </audio>
        <audio id="punch">
          <source src={punch} type="audio/ogg" />
        </audio>
        <audio id="slice">
          <source src={slice} type="audio/ogg" />
        </audio>
        <audio id="walk">
          <source src={walk} type="audio/ogg" />
        </audio>
        <audio id="pickUpSword">
          <source src={pickUpSword} type="audio/ogg" />
        </audio>
        <audio id="cthuluWarn">
          <source src={cthuluWarn} type="audio/ogg" />
        </audio>
        <audio id="cthuluEnd">
          <source src={cthuluEnd} type="audio/ogg" />
        </audio>
        <audio id="portal">
          <source src={portal} type="audio/ogg" />
        </audio>

      </div>
    );
  }
});

export default AudioBlock;
