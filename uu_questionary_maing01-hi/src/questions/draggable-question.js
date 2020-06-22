//@@viewOn:imports
import React from 'react';
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";

import { DragSource, DropTarget } from "react-dnd";
import "react-dnd-html5-backend";
import "react-dnd-touch-backend";
//@@viewOff:imports

export const DraggableQuestion = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "DraggableQuestion",
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
  _card() {
    const dragStart = e =>{
      const target = e.target;
      e.dataTransfer.setData('card_id', target.id);

      setTimeout(() => {
        target.style.display = "none";
      }, 0);
    }

    const dragOver = e => {
      e.stopPropagation();
    }

    return (
      <UU5.Bricks.Div
        id={this.props.id}
        className={this.props.className}
        draggable={this.props.draggable}
        onDragStart={dragStart}
        onDragOver={dragOver}
      >
        {this.props.children}
      </UU5.Bricks.Div>
    );
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    let { connectDragSource, isDragging, id, className, style } = this.props
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default DraggableQuestion;
