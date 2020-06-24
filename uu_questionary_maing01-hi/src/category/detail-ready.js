//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import QuestionTile from "../questions/question-tile.js";
import FormModal from "../common/form-modal.js";
import CreateForm from "../questions/create-form.js";
import LSI from "./config/category-lsi";
//@@viewOff:imports

export const DetailReady = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "DetailReady",
    classNames: {
      main: (props, state) => Config.Css.css``
    },
    lsi: LSI
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onCreate: UU5.PropTypes.func,
    data: UU5.PropTypes.object
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      onCreate: () => {
        console.log("onCrate is not implemeted");
      },
      data: {}
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
  _getTile(data) {
    return <QuestionTile data={data} />;
  },
  _createModal(cmp) {
    this._modal = cmp;
  },
  _handleOnSaveQuestion(opt){
    let newQuestion = {
      name: opt.name,
      answers: []
    };
    Object.keys(opt).forEach(key => {
      if (key !== "name") {
        newQuestion.answers.push(opt[key]);
      }
    });
    console.table(newQuestion);
    this.props.onCreate(newQuestion);
  },
  _getActions() {
    return [
      {
        content: {
          en: "Add question"
        },
        onClick: () => {
          console.log("Add question");
          this._modal.open({
            header: this.getLsiComponent("createQuestionHeader"),
            content: <CreateForm />,
            onSave: this._handleOnSaveQuestion,
            controls: {
              buttonSubmitProps: {
                content: this.getLsiComponent("createQuestionButton")
              }
            }
          });
        },
        icon: "mdi-plus-circle",
        active: true
      }
    ];
  },

  _getChildren() {
    let { name, questions } = this.props.data;
    return (
      <UU5.Bricks.Section header={name}>
        <UU5.Bricks.Div {...this.getMainPropsToPass()}>
          <UU5.Tiles.ListController data={questions} selectable={false} autoResize={true}>
            <UU5.Tiles.ActionBar title="Список вопросов" actions={this._getActions()} />
            <UU5.Tiles.List
              tile={this._getTile}
              tileHeight={250}
              tileMinWidth={100}
              tileMaxWidth={400}
              rowSpacing={2}
              tileSpacing={2}
              tileBorder
            />
          </UU5.Tiles.ListController>
          <FormModal ref_={this._createModal} />
        </UU5.Bricks.Div>
      </UU5.Bricks.Section>
    );
  },
  //@@viewOff:private
  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        {this._getChildren()}
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default DetailReady;
