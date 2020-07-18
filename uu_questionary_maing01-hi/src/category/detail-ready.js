//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5g04-block-layout";
import Calls from "calls";
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
    onDelete: UU5.PropTypes.func,
    data: UU5.PropTypes.object
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      onCreate: () => {
        console.log("onCrate is not implemeted");
      },
      onDelete: () => {
        console.log("onDelete is not implemented");
      },
      data: {}
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  getInitialState() {
    return{
      questions: this.props.data.questions
    };
  },
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
  _handleOnSaveQuestion(opt) {
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

    Calls.categoryAddQuestion(this.props.data.id, newQuestion);

    let newQuestionsArray = this.state.questions;
    newQuestionsArray.push(newQuestion); 
    this.setState({
      questions: (newQuestionsArray)
    })
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
      },
      {
        content: {
          en: "Delete"
        },
        icon: "mdi-delete",
        active: false,
        onClick: () => {
          //todo delete content
        }
      },
      {
        content: {
          en: "Edit"
        },
        active: false,
        onClick: () => {
          //tuguduk
        }
      }
    ];
  },

  _handleDelete(record) {
    this._modal.open({
      header: "Delete",
      content: <UU5.Bricks.P>{this.getLsiComponent("deleteConfirm", null, record.name)}</UU5.Bricks.P>,
      onSave: () => this.props.onDelete(record),
      controls: {
        buttonSubmitProps: {
          content: "Delete",
          colorSchema: "danger"
        }
      }
    });
  },

  _getChildren() {
    let { id, name, questions } = this.props.data;
    return (
      <UU5.BlockLayout.Block
        actions={[
          {
            icon: "mdi-delete",
            content: "Delete",
            active: true,
            onClick: () => {
              console.log("delete :" + id);
              this._handleDelete({ name, id });
            }
          }
        ]}
      >
        <UU5.BlockLayout.Row>{name}</UU5.BlockLayout.Row>
        <UU5.BlockLayout.Line />
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
      </UU5.BlockLayout.Block>
    );
  },
  //@@viewOff:private
  //@@viewOn:render
  render() {
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>{this._getChildren()}</UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default DetailReady;
