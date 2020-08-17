//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

export const QuestionaryTemplateReady = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionaryTemplateReady",
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
  _loadQuestions(questions) {
    let getQuestions = [];
    for (let key in questions) {
      getQuestions.push(
        <UU5.Bricks.Div>
          <UU5.Bricks.Section header={questions[key].name}></UU5.Bricks.Section>
          {this._loadAnswers(questions[key].answers)}
        </UU5.Bricks.Div>
      );
    }
    return getQuestions;
  },
  _loadAnswers(answers) {
    let children = answers.map(element => {
      return <UU5.Bricks.Li key={UU5.Common.Tools.generateUUID()} content={element} />;
    });

    return <UU5.Bricks.Ul>{children}</UU5.Bricks.Ul>;
  },
  _createTest(uuId) {
    let dtoIn = {
      questionaryId: this.props.data.id,
      uuId: uuId
    }
    Calls.answerCreate(dtoIn).then(() => {
      UU5.Environment.setRoute("answers");
    });
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    const { name, questions } = this.props.data;
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Bricks.Button
          onClick={() => UU5.Environment.setRoute("questionaries")}
        >
          <UU5.Bricks.Icon icon="uu5-arrow-left" /> Back
        </UU5.Bricks.Button>

        <UU5.Bricks.Section header={name}></UU5.Bricks.Section>
        <UU5.Forms.TextButton
          label='Assign this test to user(uuId): '
          inputColWidth="s-3"
          labelColWidth="s-3"
          buttons={[{
            icon: 'mdi-check',
            onClick: opt => this._createTest(opt.value),
            colorSchema: 'info',
          }]}
        />

        {this._loadQuestions(questions)}
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default QuestionaryTemplateReady;
