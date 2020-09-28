//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Calls from "calls";
import Config from "./config/config.js";
//@@viewOff:imports

export const QuestionaryLoad = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.IdentityMixin],
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
  _onSaveAnswers(opt) {
    let dtoIn = {
      id: this.props.testData.id,
      name: this.getIdentity().name,
      uuId: this.getIdentity().uuIdentity,
      answers: opt,
      completed: true
    }
    console.log(dtoIn);
    Calls.answerUpdate(dtoIn).then(() => {
      this.alert2.addAlert({ content: "Test is done!"})
    });
    
  },

  _loadAnswers(answers, question) {

    let radioAnswers = [];

    for (var i in answers) {
      radioAnswers.push({ label: answers[i], name: answers[i].replace(/ /g, "-") });
    }
    if (question.own) {
      radioAnswers.push({ label: "own", name: (question.name.replace(/ /g, "-") + "-own") })
    }
    
    return radioAnswers;
  },
  
  _isRequired(required){
    let radios;
    required == true ? (
      radios = (
        <UU5.Forms.Radios
          key={keyId}
          name={questionsArr[i].name.replace(/ /g, "-")}
          size="m"
          value={this._loadAnswers(questionsArr[i].answers, questionsArr[i])}
          required
        />
      )
    ) : (
      radios = (<UU5.Forms.Radios
        key={keyId}
        name={questionsArr[i].name.replace(/ /g, "-")}
        size="m"
        value={this._loadAnswers(questionsArr[i].answers, questionsArr[i])}
      />)
    )
  },

  _loadQuestions(questionsArr) {
    let getQuestionsForm = [];

    for (let i = 0; i < questionsArr.length; i++) {
      let textFormName = questionsArr[i].name + "-own";
      let keyId = UU5.Common.Tools.generateUUID();

      getQuestionsForm.push(<UU5.Bricks.Div>
        <UU5.Bricks.Section header={questionsArr[i].name}></UU5.Bricks.Section>
        <UU5.Bricks.Div>
          {questionsArr[i].required == true ? (
            <UU5.Forms.Radios
              key={keyId}
              name={questionsArr[i].name.replace(/ /g, "-")}
              size="m"
              value={this._loadAnswers(questionsArr[i].answers, questionsArr[i])}
              required
            />
          ) : (
            <UU5.Forms.Radios
              key={keyId}
              name={questionsArr[i].name.replace(/ /g, "-")}
              size="m"
              value={this._loadAnswers(questionsArr[i].answers, questionsArr[i])}
            />
          )}
        </UU5.Bricks.Div>
        
        {questionsArr[i].own == true ? (
          <UU5.Forms.Text
            key={keyId}
            name={textFormName}
            inputWidth="400px"
            placeholder="I'm busy. I'm eating ice cream"
            size="s"
          />
        ) : (
          <></>
        )}
        
      </UU5.Bricks.Div>);
      console.log(questionsArr[i].own)
    }

    return getQuestionsForm.map(el => {
      return <UU5.Bricks.Span key={UU5.Common.Tools.generateUUID()}>{el}</UU5.Bricks.Span>
    })
  },

  //@@viewOff:private

  //@@viewOn:render
  render() {
    const { uuId } = this.props.testData;
    const { name, questions} = this.props.data;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()} style="padding: 30px">
      <UU5.Bricks.AlertBus position="center" ref_={item => (this.alert2 = item)} colorSchema="success" closeTimer={5000}/>
      <UU5.Bricks.Section header={name}></UU5.Bricks.Section>
      {uuId == this.getIdentity().uuIdentity ? (
        <UU5.Forms.Form
          onSave={(opt) => this._onSaveAnswers(opt.values)}
        >
          {this._loadQuestions(questions)}
          <UU5.Forms.Controls buttonCancelProps = {false}/>
        </UU5.Forms.Form>
      ) : (
        <UU5.Forms.Form
          onSave={(opt) => this._onSaveAnswers(opt.values)}
        >
          {this._loadQuestions(questions)}
          <UU5.Bricks.Div style="color: red; text-align: center">You can't run this test</UU5.Bricks.Div>
        </UU5.Forms.Form>
      )
      }
      
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionaryLoad;
