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
  _deleteCategory(dtoIn) {
    Calls.categoryDelete(dtoIn)
    .then(dtoOut => {
      UU5.Environment.setRoute("/categories");
    })
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

  _categoryUpdate (dtoIn) {
    return Calls.categoryUpdate(dtoIn);
  },
  _handleCategoryUpdate (data, updateCategory) {
    updateCategory(data)
      .then(dtoOut => {
        console.log("successfully updated");
      })
      .catch(response => {
        console.log("update failed");
      });
    console.log("update category");
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.DataManager 
          onLoad={this._loadCategory}
          onUpdate={this._categoryUpdate}
        >
          {({ data: data, handleUpdate}) => {
            if (data) {
              return (
                <DetailReady
                  data={data}
                  onUpdate={data => {
                    this._handleCategoryUpdate(data, handleUpdate);
                  }}
                  deleteCategory={this._deleteCategory}
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
