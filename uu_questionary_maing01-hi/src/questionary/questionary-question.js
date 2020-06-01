//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Config from "./config/config.js";
import Calls from "calls";
import QuestionaryAnswer from "./questionary-answer.js";
import QuestionaryQuestionload from "./questionary-questionload.js";
//@@viewOff:imports

export const QuestionaryQuestion = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionaryQuestion",
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
  _loadQuestion(dtoIn){
    dtoIn = this.props.data;
    return new Promise((resolve, reject) => {
      Calls.questionGet({
        data: {id: dtoIn},
        done: data =>
          resolve(
            data
          ),
        fail: response => reject(response)
      });
    });
  },

  //@@viewOff:private

  //@@viewOn:render
  render() {
    const questionId = this.props.data;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Common.DataManager
        onLoad={this._loadQuestion}
      >
        {({ data: data }) => {
          if (data) {
            return (
              <QuestionaryQuestionload data={data}/>
            );
          } else {
            return <UU5.Bricks.Loading />;
          }
        }}
      </UU5.Common.DataManager>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionaryQuestion;