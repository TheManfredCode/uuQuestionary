//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Question from "../questions/question"
//@@viewOff:imports

export const CategoryReady = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "CategoryReady",
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
  //@@viewOff:private

  //@@viewOn:render
  render() {
    const {name, questions} = this.props.data;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <h3>{name}</h3>
      <UU5.Tiles.ListController data={questions} selectable={false}>
        <UU5.Tiles.List
          tile={
            <Question usedIn="categoryList"/>
          }
          tileHeight={50}
        />
      </UU5.Tiles.ListController>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default CategoryReady;
