//@@viewOn:imports
import React from 'react';
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
//@@viewOff:imports

export const QuestionaryContainer = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionaryContainer",
    classNames: {
      main: (props, state) => Config.Css.css``
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _board () {
    const drop = e => {
      e.preventDefault();
      const card_id = e.dataTransfer.getData('card_id');

      const card = document.getElementById(card_id);
      card.style.display = 'block';

      e.target.appendChild(card);
    }

    const dragOver = e => {
      e.preventDefault();
    }

    return(
      <UU5.Bricks.Div 
        id={this.props.id}
        onDrop={drop}
        onDragOver={dragOver}
        className={this.props.className}
      >
        {this.props.children}
      </UU5.Bricks.Div>
    );
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      {this._board()}
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionaryContainer;
