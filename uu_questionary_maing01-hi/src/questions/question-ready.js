//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Config from "./config/config.js";
import QuestionAnswer from "./question-answer.js";
//@@viewOff:imports

export const QuestionReady = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionReady",
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
  _getAnswersNumber() {
    let { answers } = this.props.data;
    let stat = 0;
    if (answers && answers.length) {
      stat = answers.length;
    }
    return (
      <UU5.Bricks.Div>
        Answers: {stat}
      </UU5.Bricks.Div>
    );
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    const { name, answers } = this.props.tileData;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <h4>
        {name}
        <UU5.Bricks.Button style="float:right; color:white; background:red"> 
          <UU5.Bricks.Icon icon="plus4u5-trash-can" />
        </UU5.Bricks.Button>
      </h4>
      
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionReady;




