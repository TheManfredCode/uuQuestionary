//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Config from "./config/config.js";
import Calls from "calls";
import Category from "../categories/category.js";

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
  _loadCategoryList(dtoIn){
    return Calls.categoriesList(dtoIn);
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Common.ListDataManager
        onLoad={this._loadCategoryList}
      >
        {({ data: listData}) => {
          if (listData) {
            return (
              <UU5.Common.Fragment>
                <UU5.Bricks.Row>
                  <UU5.Bricks.Resize>
                    <UU5.Tiles.ListController data={listData} selectable={true}>                 
                      <UU5.Tiles.List
                        tile={
                          <Category/>
                        }
                        tileHeight={250}
                        rowSpacing={5}
                        tileBorder
                      />
                    </UU5.Tiles.ListController>
                  </UU5.Bricks.Resize>
                </UU5.Bricks.Row>
              </UU5.Common.Fragment>
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

export default Categories;
