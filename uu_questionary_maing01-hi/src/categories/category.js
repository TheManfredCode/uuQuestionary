//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Config from "../core/config/config.js";
import Calls from "calls";
import Question from "../questions/question.js";
//@@viewOff:imports

export const CategoryList = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "CategoryList",
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
  _addQuestion() {
    UU5.Environment.setRoute("question/create");
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    const {name, questions} = this.props;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <h3>{name}</h3>
      <UU5.Common.Fragment>
        <UU5.Bricks.Row>
          <UU5.Bricks.Resize>
            <UU5.Tiles.ListController data={questions} selectable={false}>
              <UU5.Tiles.List
                tile={
                  <Question />
                }
                maxTileHeight ={120}
                rowSpacing={5}
              />
            </UU5.Tiles.ListController>
          </UU5.Bricks.Resize>
        </UU5.Bricks.Row>
      </UU5.Common.Fragment>
      <UU5.Bricks.Button onClick={this._addQuestion} >Add question</UU5.Bricks.Button>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default CategoryList;
