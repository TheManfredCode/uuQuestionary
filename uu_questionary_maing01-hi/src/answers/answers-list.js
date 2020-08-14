//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import AnswersTile from "./answers-tile.js";
//@@viewOff:imports

export const AnswersList = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "AnswersList",
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
  _getTile(tileData) {
    return <AnswersTile data={tileData}/>
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Tiles.ListController data={this.props.data} selectable={false} autoResize={true}>
          <UU5.Tiles.List
            tile={this._getTile}
            tileHeight={200}
            tileMinWidth={100}
            tileMaxWidth={400}
            rowSpacing={2}
            tileSpacing={2}
            tileBorder
          />
        </UU5.Tiles.ListController>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default AnswersList;
