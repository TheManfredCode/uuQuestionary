//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Calls from "calls";
import Config from "./config/config.js";
import CategoryReady from "../category/category-ready.js";
//@@viewOff:imports

export const CategoryDetail = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, , UU5.Common.RouteMixin],
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

  //@@viewOff:private
  
  _loadCategory(dtoIn) {
    dtoIn = this.props.params.id;
    return new Promise((resolve, reject) => {
      Calls.categoryGet({
        data: { id: dtoIn },
        done: dtoOut =>
          resolve(
            dtoOut
          ),
        fail: response => reject(response)
      });
    });
  },
  //@@viewOn:render
  render() {
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Common.DataManager
        onLoad={this._loadCategory}
      >
        {({ data: data, handleCreate}) => {
          if (data) {
            return (
              <CategoryReady 
                data={data}
                categoryId={this.props.params.id}
              />
            );
          } else {
            return <UU5.Bricks.Loading />;
          }
        }}
      </UU5.Common.DataManager>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default CategoryDetail;
