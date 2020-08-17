//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Config from "./config/config.js";
import Calls from "calls";
import QuestionaryLoad from "../questionary/questionary-load.js";
//@@viewOff:imports

export const Questionary = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Questionary",
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
  _loadQuestionary() {
    let dtoIn = this.props.params.questionaryId;
    return new Promise((resolve, reject) => {
      Calls.questionaryGet({
        data: { id: dtoIn },
        done: dtoOut =>
          resolve(
            dtoOut
          ),
        fail: response => reject(response)
      });
    });
  },
  _loadAnswers() {
    let dtoIn = this.props.params.id;
    return new Promise((resolve, reject) => {
      Calls.answerGet({
        data: { id: dtoIn },
        done: dtoOut =>
          resolve(
            dtoOut
          ),
        fail: response => reject(response)
      });
    });
  },

  //@@viewOff:private

  //@@viewOn:render
  render() {
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Common.DataManager
        onLoad={this._loadQuestionary}
      >
        {({ data: questionaryData }) => {
          if (questionaryData) {
            return (
              <UU5.Common.DataManager
                onLoad={this._loadAnswers}
              >
                {({ data: testData }) => {
                  if (testData) {
                    return (
                      <QuestionaryLoad data={questionaryData} testData={testData} />
                    );
                  } else {
                    return <UU5.Bricks.Loading />;
                  }
                }}
              </UU5.Common.DataManager>
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

export default Questionary;
