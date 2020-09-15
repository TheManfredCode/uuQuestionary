//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5g04-block-layout";
import Config from "./config/config.js";
import LSI from "./config/questions-lsi.js";
//@@viewOff:imports

export const CreateForm = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "CreateForm",
    classNames: {
      main: (props, state) => Config.Css.css``
    },
    lsi: LSI
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  getInitialState() {
    return {
      answers: [],
      nameValue: ""
    };
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _getValue(keyId) {
    let values = this.state.values;
    let value = "aaa";
    for (let key in values) {
      if (values[key].name == keyId) {
        value = values[key].value;
      }
    }
    console.log(value);
    return value;
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
    console.log(exists);
    let keyId = UU5.Common.Tools.generateUUID();
    let newOne = (
      <UU5.Forms.Text
        key={keyId}
        id={keyId}
        placeholder="Answer option"
        size="m"
        // buttons={[
        //   {
        //     icon: "mdi-minus",
        //     onClick: opt => this._removeInputForAnswer(keyId),
        //     colorSchema: "info"
        //   }
        // ]}
      />
    );
    exists.push(newOne);
    this.setState({
      answers: exists,
    });
  },

  _addAnswersByNum(n) {
    this.setState ({
      answers: [],
    });
    for (i = 0; i < n; i++) {
      this._addInputForAnswer()
    }
  },

  _getChildren() {
    return (
      <UU5.Bricks.Div>
        <UU5.Forms.Text
          inputAttrs={{ maxLength: 255 }}
          name="name"
          label={this.getLsiComponent("questionName")}
          value={this.state.nameValue}
          required
        />

        <UU5.Forms.TextButton
          name="answersCount"
          label="Enter answers number : "
          size="m"
          buttons={[
            {
              icon: "mdi-plus",
              onClick: (opt) => {
                for (let i = 0; i < opt.value; i++) {
                  this._addInputForAnswer()
                }
              },
              colorSchema: "info"
            }
          ]}
        />

        <UU5.BlockLayout.Block
          // actions={[
          //   {
          //     icon: "mdi-plus",
          //     content: "Add",
          //     active: true,
          //     onClick: () => this._addInputForAnswer()
          //   }
          // ]}
        >
          <UU5.BlockLayout.Line />
        </UU5.BlockLayout.Block>

        {this.state.answers}
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

export default CreateForm;
