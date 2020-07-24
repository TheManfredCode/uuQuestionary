//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
//@@viewOff:imports

export const UpdateForm = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "UpdateForm",
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
  getInitialState() {
    return {
      answers: this._loadAnswers()
    };
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _loadAnswers() {
    let answers = [];
    for (const i in this.props.questionAnswers) {
      let keyId = UU5.Common.Tools.generateUUID();
      answers.push(
        <UU5.Forms.TextButton
          key={keyId}
          id={keyId}
          placeholder="Answer option"
          value={this.props.questionAnswers[i]}
          required
          size="m"
          buttons={[
            {
              icon: "mdi-minus",
              onClick: opt => this._removeInputForAnswer(keyId),
              colorSchema: "info"
            }
          ]}
        />
      );
    }
    console.log(answers);
    return answers;
  },
  _removeInputForAnswer(id) {
    let exists = this.state.answers;
    let newAnswers = exists.filter(element => {
      if (element.key !== id) {
        return element;
      }
    });
    this.setState({ answers: newAnswers });
  },
  _addInputForAnswer() {
    let exists = this.state.answers;
    let keyId = UU5.Common.Tools.generateUUID();
    let newOne = (
      <UU5.Forms.TextButton
        key={keyId}
        id={keyId}
        placeholder="Answer option"
        required
        size="m"
        buttons={[
          {
            icon: "mdi-minus",
            onClick: opt => this._removeInputForAnswer(keyId),
            colorSchema: "info"
          }
        ]}
      />
    );
    exists.push(newOne);
    this.setState({ answers: exists });
  },
  _getChildren() {
    return (
      <UU5.Bricks.Div>
        <UU5.Forms.Text
          inputAttrs={{ maxLength: 255 }}
          name="name"
          label={this.getLsiComponent("questionName")}
          value={this.props.questionName}
          required
        />
        <UU5.BlockLayout.Block
          actions={[
            {
              icon: "mdi-plus",
              content: "Add",
              active: true,
              onClick: () => this._addInputForAnswer()
            }
          ]}
        >
          <UU5.BlockLayout.Row className="row">Options list</UU5.BlockLayout.Row>
          <UU5.BlockLayout.Line />
        </UU5.BlockLayout.Block>
        {this.state.answers.map((element, index) => {
          return element;
        })}
      </UU5.Bricks.Div>
    );
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>{this._getChildren()}</UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default UpdateForm;
