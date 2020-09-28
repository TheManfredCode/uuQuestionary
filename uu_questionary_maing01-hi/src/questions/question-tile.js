//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5g04-block-layout";
import "uu5tilesg01";
import Config from "../config/config.js";
import UpdateForm from "./update-form.js";
import FormModal from "../common/form-modal.js";
//@@viewOff:imports

export const QuestionTile = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionTile",
    classNames: {
      main: (props, state) => Config.Css.css``
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      data: {}
    };
  },

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

  _getAnswersList(answers, own) {
    let children = answers.map(element => {
      return <UU5.Bricks.Li key={UU5.Common.Tools.generateUUID()} content={element} />;
    });
    if (own) children.push(<UU5.Bricks.Li key={UU5.Common.Tools.generateUUID()} content="own" />)

    return <UU5.Bricks.Ul>{children}</UU5.Bricks.Ul>;
  },

  _handleOnSaveQuestion(opt){
    let newQuestion = {
      name: opt.name,
      answers: []
    };
    Object.keys(opt).forEach(key => {
      if (key !== "name") {
        newQuestion.answers.push(opt[key]);
      }
    });
    console.table(newQuestion);

    return this.props.updateQuestion(this.props.data.name, newQuestion);
  },

  _getChild() {
    let { name, answers, own } = this.props.data;
    return (
      <UU5.BlockLayout.Block
        actions={[
          {
            content: "Edit",
            active: false,
            onClick: () => {
              this._modal.open({
                header: "Update question",
                content: <UpdateForm 
                  questionName={name} 
                  questionAnswers={answers}
                />,
                onSave: this._handleOnSaveQuestion,
                controls: {
                  buttonSubmitProps: {
                    content: "Update"
                  }
                }
              });
            }
          },
          {
            content: "Delete",
            active: false,
            onClick: () => {
              this._modal.open({
                header: "Delete",
                content: <UU5.Bricks.P>Are you sure delete '{this.props.data.name}' question?</UU5.Bricks.P>,
                onSave: () => this.props.deleteQuestion(this.props.data.name),
                controls: {
                  buttonSubmitProps: {
                    content: "Delete",
                    colorSchema: "danger"
                  }
                }
              });
              
            }
          }
        ]}
      >
        <UU5.BlockLayout.Row className="row">{name}</UU5.BlockLayout.Row>
        <UU5.BlockLayout.Line />
        {this._getAnswersList(answers, own)}
        <FormModal ref_={this._createModal} />
      </UU5.BlockLayout.Block>
    );
  },

  //@@viewOff:private

  //@@viewOn:render
  render() {
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>{this._getChild()}</UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionTile;
