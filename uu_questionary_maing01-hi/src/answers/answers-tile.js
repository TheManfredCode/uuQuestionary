//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

export const AnswersTile = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "AnswersTile",
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
    dtoIn = this.props.data.questionaryId;
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
  _getQuestionaryName() {
    return (
      <UU5.Common.DataManager
        onLoad={this._loadQuestionary}
      >
        {({ data: data }) => {
          if (data) {
            return (
              <UU5.Bricks.Div content={data.name}/>
            );
          } else {
            return <UU5.Bricks.Loading />;
          }
        }}
      </UU5.Common.DataManager>
    );
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    const {name, uuId, completed, id, questionaryId} = this.props.data;
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        
        <UU5.BlockLayout.Block
          actions={[
            { icon: "mdi-radioactive", content: "GO", active: true, onClick: () => {
                UU5.Environment.setRoute("/questionary", {id: id, questionaryId: questionaryId});
              } 
            }
          ]}
        >
          <UU5.BlockLayout.Row>Name : {name}</UU5.BlockLayout.Row>
          <UU5.BlockLayout.Row>UUID : {uuId}</UU5.BlockLayout.Row>
          <UU5.BlockLayout.Line/>
          {completed ? (
            <UU5.BlockLayout.Row style="color: green">Completed</UU5.BlockLayout.Row>
          ) : (
            <UU5.BlockLayout.Row style="color: red">Don't completed</UU5.BlockLayout.Row>
          )}
          <UU5.BlockLayout.Row>test name : {this._getQuestionaryName()}</UU5.BlockLayout.Row>
        </UU5.BlockLayout.Block>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default AnswersTile;
