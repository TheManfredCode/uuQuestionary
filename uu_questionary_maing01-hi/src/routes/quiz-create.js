//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import QuizCreateReady from "../quiz/create-ready.js";
import Calls from "calls";
//@@viewOff:imports

export const QuizCreate = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuizCreate",
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
  _loadCategoryList(dtoIn) {
    return new Promise((resolve, reject) => {
      Calls.categoryList({
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
          onLoad={this._loadCategoryList}
        >
          {({ data: listData, handleCreate }) => {
            if (listData) {
              return (
                <QuizCreateReady
                  data={listData}
                  onCreate={data => {
                    this._handleAddCategory(data, handleCreate, listData);
                  }}
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

export default QuizCreate;
