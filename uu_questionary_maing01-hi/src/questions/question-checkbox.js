//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "../core/config/config.js";
//@@viewOff:imports

export const QuestionCheckbox = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionCheckbox",
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
    const {name} = this.props;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Forms.Checkbox
        label={name}
        size="s"
        bgStyleChecked="filled"
        labelPosition="right"
      />     
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionCheckbox;
