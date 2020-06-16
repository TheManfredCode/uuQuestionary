//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Config from "./config/config.js";
import Calls from "calls";
import CategoryListReady from "../category/list-ready.js";

//@@viewOff:imports

export const Categories = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Categories",
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
  _createCategory(dtoIn) {
    return Calls.categoryCreate(dtoIn);
  },
  _handleAddCategory(data, createCategory, appData) {
    createCategory({...data, inProgress: true})
      .then(dtoOut => {
        this._handleAddCategoryDone(dtoOut, appData);
      })
      .catch(response => {
        console.log("fail");
      });
    console.log("add category");
  },
  _handleAddCategoryDone(dtoOut, appData) {
    //todo refresh data

  },

  _handleAddCategoryFail(response) {
    // display alert
    reportError(this.getLsiComponent("createFailHeader"), this._decideErrorDescription(response));
  },
  _handleUpdateCategory(dtoIn) {
    console.log("update category");
  },
  _handleDeleteCategory(dtoIn) {
    console.log("delete category");
  },
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
          {({data: listData, handleCreate, handleUpdate, handleDelete}) => {
            if (listData) {
              return (
                <CategoryListReady
                  data={listData}
                  onCreate={data => {
                    this._handleAddCategory(data, handleCreate, listData);
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

export default Categories;
