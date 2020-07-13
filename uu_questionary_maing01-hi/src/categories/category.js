//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Config from "../core/config/config.js";
import Calls from "calls";
import QuestionTile from "../questions/question-tile.js";
import QuestionCreate from "../questions/question-create.js";
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
  _onSave(dtoIn) {
    return Calls.lotCreate(dtoIn.values);
  },
  _addQuestion() {
    UU5.Environment.setRoute("question/create");
    console.log("OOOOOOOOOOOOOO" + this.props.categoryId)
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    //const { name, questions, id } = this.props;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      {console.log(this.props.data)/*<h3>{name}</h3>
      <UU5.Tiles.ListController data={questions} selectable={false}>
        <UU5.Tiles.List
          tile={
            <QuestionTile usedIn="categoryList" />
          }
          tileHeight={250}
        />
        </UU5.Tiles.ListController>*/}
      <UU5.Bricks.Modal
        ref_={addQuestion => this._addQuestion = addQuestion}
        content={
          <QuestionCreate
          />
        }
      />
      <UU5.Bricks.Button onClick={ () => this._addQuestion.open({size: "m"}) }>Add question</UU5.Bricks.Button>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default CategoryList;
