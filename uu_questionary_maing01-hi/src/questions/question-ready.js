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
    let {answers} = this.props.data;
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
    const { name, answers } = this.props.data;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Bricks.Div>{name}</UU5.Bricks.Div>
      <UU5.Bricks.Div>{this._getAnswersNumber()}</UU5.Bricks.Div>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionReady;



// <UU5.Tiles.ListController data={answers} selectable={false}>
//   <UU5.Tiles.List
//     tile={
//       <QuestionAnswer />
//     }
//     tileHeight={50}
//   />
// </UU5.Tiles.ListController>
