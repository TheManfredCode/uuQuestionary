//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "../core/config/config.js";
import Calls from "calls";
import QuestionTile from "../questions/question-tile.js";
//@@viewOff:imports

export const QuestionaryCheckbox = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionaryCheckbox",
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
    const {name, questions} = this.props;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Forms.Checkbox
        label={name}
        size="l"
        bgStyleChecked="filled"
        labelPosition="right"
      />
      <UU5.Tiles.ListController data={questions} selectable={false}>
        <UU5.Tiles.List
          tile={
            <QuestionTile usedIn="questionaryCreate"/>
          }
          tileHeight={50}
        />
      </UU5.Tiles.ListController>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionaryCheckbox;
