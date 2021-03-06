//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "calls";
import QuestionaryTemplateLoad from "../questionary/questionary-template-ready.js";

//@@viewOff:imports

export const QuestionaryTemplate = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionaryTemplate",
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
  _loadQuestionary(dtoIn) {
    dtoIn = this.props.params.id;
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
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.DataManager
          onLoad={this._loadQuestionary}
        >
          {({ data: data }) => {
            if (data) {
              return (
                <QuestionaryTemplateLoad data={data} />
              );
            } else {
              return <UU5.Bricks.Loading />;
            }
          }}
        </UU5.Common.DataManager>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default QuestionaryTemplate;
