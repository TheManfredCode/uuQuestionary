//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Config from "./config/config.js";
import AnswersTile from "./answers-tile.js";
import Filter from "./filter-select.js";
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
  _getFilters() {
    return [
      {
        key: "completed",
        label: {en: "completed state"},
        filterFn: (item, value) => {
          let fragments = value;
          if (item.completed && value === "a"){
            return item;
          } else if (!item.completed && value === "b") {
            return item;
          }
          // return (
          //   fragments.some(frag => this.getLsiItem(item.completed).toLowerCase().indexOf(frag.toLowerCase()) !== -1)
          // );
        }
      }
    ]
  },

  _getTile(tileData) {
    return <AnswersTile data={tileData}/>
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Tiles.ListController data={this.props.data} selectable={false} autoResize={true}>
          <UU5.Tiles.FilterBar
            // simpleFilterPanel
            filters={this._getFilters()}
          >
            <Filter/>
          </UU5.Tiles.FilterBar>
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
