//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
//@@viewOff:imports

export const QuestionaryCompletedLoad = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionaryCompletedLoad",
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
  _getOwnAnswerValue(name, answersValues) {
    let value;
    for (var key in answersValues){
      if (name == key) {
        value = answersValues[key];
      }
    }
    return value;
  },

  _loadAnswers(answers, question, own, answersValues) {
    let radioAnswers = [];

    for (var i in answers) {
      let answer;
      for (var key in answersValues){
        if (answersValues[key]) {
          if (answersValues[key].replace(/ /g, "-") === answers[i].replace(/ /g, "-")) {
            answer = { label: answers[i], name: answers[i].replace(/ /g, "-"), value: true };
            break;
          } else {
            answer = { label: answers[i], name: answers[i].replace(/ /g, "-")};
          }
        } else {
          answer = { label: answers[i], name: answers[i].replace(/ /g, "-")};
        }
        
      }
      radioAnswers.push(answer);
    }
    if (own) radioAnswers.push({ label: "own", name: (question.replace(/ /g, "-") + "-own") })

    return radioAnswers;
  },
  
  _loadQuestions(questionsArr, answersValues) {
    let getQuestionsForm = [];

    for (let i = 0; i < questionsArr.length; i++) {
      let textFormName = questionsArr[i].name + "-own";
      let own = false;
      let keyId = UU5.Common.Tools.generateUUID();
      if (questionsArr[i].own) own = true;

      getQuestionsForm.push(<UU5.Bricks.Div>
        <UU5.Bricks.Section header={questionsArr[i].name}></UU5.Bricks.Section>
        <UU5.Bricks.Div>  </UU5.Bricks.Div>
        <UU5.Forms.Radios
          key={keyId}
          name={questionsArr[i].name.replace(/ /g, "-")}
          
          size="m"
          value={this._loadAnswers(questionsArr[i].answers, questionsArr[i].name, own, answersValues)}
          readOnly
        />
        
        {own ? (
          <UU5.Forms.Text
            key={keyId}
            name={textFormName}
            value={this._getOwnAnswerValue(textFormName, answersValues)}
            inputWidth="400px"
            placeholder="I'm busy. I'm eating ice cream"
            size="s"
            readOnly
          />
          ) : (
            <></>
          )
        }
        
      </UU5.Bricks.Div>);
    }

    return getQuestionsForm.map(el => {
      return <UU5.Bricks.Span key={UU5.Common.Tools.generateUUID()}>{el}</UU5.Bricks.Span>
    })
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    const { name, questions} = this.props.questionaryData;
    const {answers} = this.props.testData;
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()} style="padding: 30px">
        <UU5.Bricks.Section header={name}></UU5.Bricks.Section>
        <UU5.Forms.Form>
          {this._loadQuestions(questions, answers)}
        </UU5.Forms.Form>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default QuestionaryCompletedLoad;
