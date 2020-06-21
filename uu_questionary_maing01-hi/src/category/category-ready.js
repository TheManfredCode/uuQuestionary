//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Question from "../questions/question.js";
import QuestionCreate from "../questions/question-create.js";
import FormModal from "../category/form-modal.js";
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
  _createModal(cmp) {
    this._modal = cmp;
  },
  _getActions() {
    return [
      {
        content: {
          en: "Add question"
        },
        onClick: () => {
          console.log("Add animal");
          this._modal.open({
            content: <QuestionCreate categoryId={this.props.categoryId} />,
            onSave: this.props.onCreate,
            controls: {
              buttonSubmitProps: {
                content: "Confirm"
              }
            }
          });
        },
        icon: "mdi-plus-circle",
        active: true
      }
    ]
  },



  //@@viewOff:private

  //@@viewOn:render
  render() {
    const { name, questions } = this.props.data;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <h2>
        {name}
        <UU5.Bricks.Modal
          ref_={createForm => this._createForm = createForm}
          content={
            <QuestionCreate
              categoryId={this.props.categoryId}
            />
          }
        />
        <UU5.Bricks.Button
          onClick={() => this._createForm.open({ size: "m" })}
          style="float:right; color:white; background:DodgerBlue"
        >
          <UU5.Bricks.Icon icon="mdi-plus-circle" />
          Create question
        </UU5.Bricks.Button>
      </h2>
      <UU5.Tiles.ListController data={questions} selectable={false} autoResize={true}>
        <UU5.Tiles.List
          tile={
            <Question usedIn="categoryList" />
          }
          tileHeight={250}
          tileMinWidth={100}
          tileMaxWidth={400}
          rowSpacing={2}
          tileSpacing={2}
          tileBorder
        />
      </UU5.Tiles.ListController>
      <FormModal ref_={this._createModal} />
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default CategoryReady;
