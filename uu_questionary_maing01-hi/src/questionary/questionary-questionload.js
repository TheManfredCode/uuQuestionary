//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Config from "./config/config.js";
import QuestionaryAnswer from "./questionary-answer"
//@@viewOff:imports

export const QuestionaryQuestionload = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionaryQuestionload",
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
  _loadAnswers (answers) {
    let radioAnswers = [];
    const mappedArray = answers.map(el => {
      radioAnswers.push({label: el, name: el})
    })
    return radioAnswers;
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    const {name, answers} = this.props.data;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      
      <UU5.Forms.Radios
        label={name}
        size="m"
        value={this._loadAnswers(answers)}
      />
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionaryQuestionload;
