//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import QuizListReady from "../quiz/list-ready.js";
import Calls from "calls";
//@@viewOff:imports

export const QuizList = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuizList",
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
  // _createCategory(dtoIn) {
  //   return Calls.categoryCreate(dtoIn);
  // },
  // _handleAddCategory(data, createCategory, appData) {
  //   createCategory({...data, inProgress: true})
  //   .then(dtoOut => {
  //     this._handleAddCategoryDone(dtoOut, appData);
  //   })
  //   .catch(response => {
  //     console.log("fail");
  //   });
  //   console.log("add category");
  // },
  // _handleAddCategoryDone(dtoOut, appData) {
  //   //todo refresh data
  //
  // },
  //
  // _handleAddCategoryFail(response) {
  //   // display alert
  //   reportError(this.getLsiComponent("createFailHeader"), this._decideErrorDescription(response));
  // },
  // _handleUpdateCategory(dtoIn) {
  //   console.log("update category");
  // },
  // _handleDeleteCategory(dtoIn) {
  //   console.log("delete category");
  // },
  _loadQuizList(dtoIn) {
    return new Promise((resolve, reject) => {
      Calls.quizList({
        done: resolve,
        fail: reject
      });
    });
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.ListDataManager
          onCreate={this._createCategory}
          onUpdate={this._handleUpdateCategory}
          onDelete={this._handleDeleteCategory}
          onLoad={this._loadQuizList}
        >
          {({data: listData, handleCreate, handleUpdate, handleDelete}) => {
            if (listData) {
              return (
                <QuizListReady
                  data={listData}
                  onCreate={dtoIn => {

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
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default QuizList;
