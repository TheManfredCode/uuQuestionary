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
      name: this.getIdentity().uuIdentity,
      answers: opt
    }
    console.log(dtoIn);
    Calls.answerCreate(dtoIn).then(() => {
      this.alert2.addAlert({ content: "Test is done!"})
    });
    
  },

  _loadAnswers(answers, question) {

    let radioAnswers = [];
    let textFormName = question.replace(/ /g, "-") + "-owntxt";
    let keyId = UU5.Common.Tools.generateUUID();

    for (var i in answers) {
      radioAnswers.push({ label: answers[i], name: answers[i].replace(/ /g, "-") });
    }
    radioAnswers.push({ label: "own", name: (question.replace(/ /g, "-") + "-own") })
    // radioAnswers.push({ 
    //   label: (
    //     <UU5.Forms.Text
    //       key={keyId}
    //       name={textFormName}
    //       label=""
    //       placeholder="I'm busy. I'm eating ice cream"
    //       size="s"
    //     />
    //   ), 
    //   name: (question.replace(/ /g, "-") + "-own") 
    // })

    return radioAnswers;
  },
  
  _loadQuestions(questionsArr) {
    let getQuestionsForm = [];

    for (let i = 0; i < questionsArr.length; i++) {
      let textFormName = questionsArr[i].name + "-own";
      let keyId = UU5.Common.Tools.generateUUID();

      getQuestionsForm.push(<UU5.Bricks.Div>
        <UU5.Bricks.Section header={questionsArr[i].name}></UU5.Bricks.Section>
        <UU5.Bricks.Div>  </UU5.Bricks.Div>
        <UU5.Forms.Radios
          key={keyId}
          name={questionsArr[i].name.replace(/ /g, "-")}
          
          size="m"
          value={this._loadAnswers(questionsArr[i].answers, questionsArr[i].name)}
        />
        <UU5.Forms.Text
          key={keyId}
          name={textFormName}
          inputWidth="400px"
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
    const { name, questions} = this.props.data;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Bricks.AlertBus position="center" ref_={item => (this.alert2 = item)} colorSchema="success" closeTimer={5000}/>
      <UU5.Bricks.Section header={name}></UU5.Bricks.Section>
      <UU5.Forms.Form
        //onSave={(opt) => alert(`opt.values:\n${JSON.stringify(opt.values, null, 2)}`)}
        onSave={(opt) => this._onSaveAnswers(opt.values)}
      >
        {this._loadQuestions(questions)}
        <UU5.Forms.Controls />
      </UU5.Forms.Form>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionaryLoad;
