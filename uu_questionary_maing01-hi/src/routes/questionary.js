//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Config from "./config/config.js";
import Calls from "calls";
import QuestionaryCategory from "../questionary/questionary-category.js";
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
  _loadQuestionary(dtoIn){
    return new Promise((resolve, reject) => {
      Calls.questionaryGet({
        data: {id: "5ed397e79d6b8009c4d5dad8"},
        done: dtoOut =>
          resolve(
            dtoOut
          ),
        fail: response => reject(response)
      });
    });
  },
  _onSave (opt) {
    console.table(opt.component);
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Forms.Form
        onSave={(opt) => this._onSave(opt)}
      >
        <UU5.Common.DataManager
          onLoad={this._loadQuestionary}
        >
          {({ data: data }) => {
            if (data) {
              return (
                <QuestionaryCategory data={data}/>
              );
            } else {
              return <UU5.Bricks.Loading />;
            }
          }}
        </UU5.Common.DataManager>
        <UU5.Forms.Controls />
      </UU5.Forms.Form>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default Questionary;
