//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Calls from "calls";
import "uu5tilesg01";
import Config from "../config/config.js";
import FormModal from "../category/form-modal.js";
import QuestionReady from "./question-ready.js";
import QuestionCreate from "./question-create.js";
//@@viewOff:imports

export const Question = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Question",
    classNames: {
      main: (props, state) => Config.Css.css``
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.array,
    onCreate: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      data: [],
      onCreate: dto => {
        console.log("onCreateHandler was fired");
        console.table(dto);
      },
      onUpdate: dto => {
        console.log("onCreateHandler was fired");
        console.table(dto);
      },
      onDelete: dto => {
        console.log("onCreateHandler was fired");
        console.table(dto);
      }
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _createModal(cmp) {
    this._modal = cmp;
  },
  _getActions() {
    return [
      {
        content: {
          en: "Add question"
        },
        onClick: () => {
          console.log("Add animal");
          this._modal.open({
            content: <QuestionCreate/>,
            onSave: this.props.onCreate,
            controls: {
              buttonSubmitProps: {
                content: "Confirm"
              }
            }
          });
        },
        icon: "mdi-plus-circle",
        active: true
      }
    ]
  },


  _loadQuestion(dtoIn) {
    dtoIn = this.props.data;
    return new Promise((resolve, reject) => {
      Calls.questionGet({
        data: { id: dtoIn },
        done: data =>
          resolve(
            data
          ),
        fail: response => reject(response)
      });
    });
  },
  _getTile (tileData) {
    return <QuestionReady tileData={tileData}/>;
  },
  //@@viewOff:private

  //@@viewOn:render

  render() {
    return (<UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Tiles.ListController data={this.props.data} selectable={false} autoResize={true}>
        <UU5.Tiles.ActionBar title="Question list" actions={this._getActions()} />
        <UU5.Tiles.List
          tile={this._getTile}
          tileHeight={200}
          tileMinWidth={100}
          tileMaxWidth={400}
          rowSpacing={2}
          tileSpacing={2}
          tileBorder
        />
      </UU5.Tiles.ListController>
      <FormModal ref_={this._createModal} />
    </UU5.Bricks.Div>);
  }
  //@@viewOff:render
});

export default Question;
