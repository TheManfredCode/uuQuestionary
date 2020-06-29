//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Calls from "calls";
import Config from "./config/config.js";
import Question from "../questions/question.js";
import QuestionCreate from "../questions/question-create.js";
//@@viewOff:imports

export const CategoryReady = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "CategoryReady",
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
  _createQuestion(dtoIn) {
    let dtoInData = {name: "question", categoryId: this.props.categoryId};
    let answers = [];
    for (var key in dtoIn.data) {
      if (key == "name"){
        dtoInData.name = dtoIn.data[key];
      } else {
        answers.push(dtoIn.data[key]);
      }
    }
    dtoInData.answers = answers;
    
    const promise1 = new Promise((resolve, reject) => {
      resolve(Calls.questionCreate(dtoInData)).then(
        setTimeout(() => {
          return (console.log("DONEeee"));
        }, 2000)
      );
    });
    
    
  },
  
  _handleAddQuestion(data, createQuestion, appData) {
    createQuestion({data})
      .then(dtoOut => {
        console.log("DONE");
      })
      .catch(response => {
        console.log("fail");
      });
    console.log("add category");
  },
  _handleAddQuestionDone(dtoOut, appData) {
    //todo refresh data

  },
  
  _handleUpdateQuestion () {

  },
  _handleDeleteQuestoion () {

  },
  _loadQuestionList(dtoIn) {
    return new Promise((resolve, reject) => {
      Calls.questionList({
        data: { 
          categoryId: this.props.categoryId,
          "sortBy": "categoryId" 
        },
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
    const { name, questions } = this.props.data;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <h2>
        {name}
        
      </h2>
      <UU5.Common.ListDataManager
        onCreate={this._createQuestion}
        onUpdate={this._handleUpdateQuestion}
        onDelete={this._handleDeleteQuestion}
        onLoad={this._loadQuestionList}
      >
      {({data: listData, handleCreate, handleUpdate, handleDelete}) => {
        if (listData) {
          return (
            <Question
              data={listData}
              onCreate={data => {
                this._handleAddQuestion(data, handleCreate, listData);
              }}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          );
        } else {
          return <UU5.Bricks.Loading />;
        }
      }}
      </UU5.Common.ListDataManager>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default CategoryReady;
