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
    return {
      name: this.props.data.name,
      questions: this.props.data.questions
    };
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private

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

    let newQuestionsArray = [];
    if (this.state.questions) {
      newQuestionsArray = this.state.questions;
    }

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
      }

    ];
  },

  _handleOnUpdateCategory (opt) {
    opt.id = this.props.data.id;
    Calls.categoryUpdate(opt);
    this.setState({
      name: opt.name
    })
  },

  _handleUpdate() {
    this._modal.open({
      header: "Edit category name",
      content: <UU5.Forms.Text label="Name" value={this.state.name} name="name" />,
      onSave: this._handleOnUpdateCategory,
      controls: {
        buttonSubmitProps: {
          content: "Update category"
        }
      }
    });
  },

  _handleDelete(record) {
    this._modal.open({
      header: "Delete",
      content: <UU5.Bricks.P>{this.getLsiComponent("deleteConfirm", null, record.name)}</UU5.Bricks.P>,
      onSave: () => this.props.deleteCategory(this.props.data.id),
      controls: {
        buttonSubmitProps: {
          content: "Delete",
          colorSchema: "danger"
        }
      }
    });
  },

  _updateQuestion(name, newQuestion) {
    let questions = this.state.questions;
    let dtoIn;
    for (const key in questions) {
      if (questions[key].name == name) {
        questions[key] = newQuestion;
        this.setState({
          questions: questions
        })
        dtoIn = {
          id: this.props.data.id,
          questions: questions
        }
        Calls.categoryUpdate(dtoIn);
      }
    }
  },

  _deleteQuestion(name) {
    let questions = this.state.questions;
    let dtoIn;
    for (const key in questions) {
      if (questions[key].name == name) {
        questions.splice(key, 1);
        this.setState({
          questions: questions
        })
        dtoIn = {
          id: this.props.data.id,
          questions: questions
        }
        Calls.categoryUpdate(dtoIn);      }
    }
  },

  _getTile(data) {
    return (
      <QuestionTile 
        data={data} 
        updateQuestion={(name, data) => {
          this._updateQuestion(name, data);
        }} 
        deleteQuestion={this._deleteQuestion}
      />);
  },

  _getChildren() {
    let { id, name, questions } = this.props.data;
    return (
      <UU5.BlockLayout.Block
        actions={[
          {
            icon: "mdi-pencil",
            content: "Edit",
            active: true,
            onClick: () => {
              this._handleUpdate();
            }
          },
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
        <UU5.BlockLayout.Row>{this.state.name}</UU5.BlockLayout.Row>
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
