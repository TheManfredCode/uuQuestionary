//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Calls from "calls";
import Config from "./config/config.js";
//@@viewOff:imports

export const QuestionaryLoad = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionaryLoad",
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


  _loadAnswers(answers) {
    // answers.push(
    //   <UU5.Forms.Text
    //     name = "own"
    //     label="Own answer"
    //     placeholder="I'm busy. I'm eating ice cream"
    //     size="s"
    //   />
    // );
    let radioAnswers = [];

    for (var i in answers) {
      radioAnswers.push({ label: answers[i], name: i });
    }

    // const mappedArray = answers.map(el => {
    //   radioAnswers.push({label: el, name: el});
    // })
    return radioAnswers;
  },
  _loadQuestions(questionsArr) {
    let getQuestionsForm = [];

    for (let i = 0; i < questionsArr.length; i++) {
      let myName = "own" + i;

      getQuestionsForm.push(<UU5.Bricks.Div>
        <UU5.Bricks.Div> {questionsArr[i].name} </UU5.Bricks.Div>
        <UU5.Forms.Radios
          name={i}
          label={questionsArr[i].name}
          size="m"
          value={this._loadAnswers(questionsArr[i].answers)}
        />
        <UU5.Forms.Text
          name={myName}
          label="Own answer"
          placeholder="I'm busy. I'm eating ice cream"
          size="s"
        />
      </UU5.Bricks.Div>);
    }

    return getQuestionsForm.map(el => {
      return <UU5.Bricks.Span key={UU5.Common.Tools.generateUUID()}>{el}</UU5.Bricks.Span>
    })
  },

  //@@viewOff:private

  //@@viewOn:render
  render() {
    const { name, questions, categoryId } = this.props.data;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <h2>{name}</h2>
      <UU5.Forms.Form
        onSave={(opt) => alert(`opt.values:\n${JSON.stringify(opt.values, null, 2)}`)}
      >
        {this._loadQuestions(questions)}
        <UU5.Forms.Controls />
      </UU5.Forms.Form>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionaryLoad;
