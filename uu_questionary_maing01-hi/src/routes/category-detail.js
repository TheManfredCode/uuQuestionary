//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Calls from "calls";
import Config from "./config/config.js";
import DetailReady from "../category/detail-ready.js";
//@@viewOff:imports

export const CategoryDetail = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "CategoryDetail",
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
    dtoIn.categoryId = this.props.params.id;
    return Calls.questionCreate(dtoIn);
  },
  _deleteCategory(dtoIn) {
    return Calls.categoryDelete(dtoIn);
  },
  _handleCreateQuestionDone(dtoOut, appData) {
    let result = UU5.Common.Tools.mergeDeep(appData, dtoOut.data);
    console.table(result);
  },
  _handleAddQuestion(question, createQuestion, appData) {
    this._createQuestion({ ...question, inProgress: true })
      .then(dtoOut => {
        this._handleCreateQuestionDone(dtoOut, appData);
      })
      .catch(response => {
        console.log("fail");
      });
    console.log("add category");
  },

  _handleDeleteCategory(category, handleDelete, data) {
    this._deleteCategory({ ...category, inProgress: true })
      .then(dtoOut => {
        UU5.Environment.setRoute("/categories");
      })
      .catch(response => {
        console.log("fail");
      });
  },

  _loadCategory(dtoIn) {
    dtoIn = this.props.params.id;
    return new Promise((resolve, reject) => {
      Calls.categoryGet({
        data: { id: dtoIn },
        done: dtoOut => resolve(dtoOut),
        fail: response => reject(response)
      });
    });
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.DataManager onLoad={this._loadCategory}>
          {({ data: data }) => {
            if (data) {
              return (
                <DetailReady
                  data={data}
                />
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

export default CategoryDetail;
