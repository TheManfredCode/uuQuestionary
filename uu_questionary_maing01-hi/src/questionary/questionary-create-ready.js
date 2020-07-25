//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

export const QuestionaryCreateReady = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionaryCreateReady",
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
  _loadQuestions (questions) {
    let questionsArray = [];
    for (const key in questions) {
      let newName = questions[key].name.replace(/ /g, "-");
      console.log(newName);
      questionsArray.push(<UU5.Forms.Checkbox label={questions[key].name} name={newName}/>);
    }
    return questionsArray;
  },

  _loadCategoryPannel (categories){
    let categoryPannels = [];
    for (const key in categories) {
      categoryPannels.push(<UU5.Bricks.Panel header={categories[key].name} content={this._loadQuestions(categories[key].questions)} />)
    }
    return <UU5.Bricks.Accordion onClickNotCollapseOthers>{categoryPannels}</UU5.Bricks.Accordion>
  },

  _handleQuestionarySave (opt, categories) {
    let questionsArr = [];
    for (var key in opt.values){
      console.log(key);
      for(var i in categories) {
        for(var el in categories[i].questions){
          if(categories[i].questions[el].name.replace(/ /g, "-") == key){
            if (opt.values[key]){
              questionsArr.push(categories[i].questions[el]);
            }
          }
        }
      }
    }
    console.log(questionsArr);
    console.log(opt.values.name);
    let dtoIn = {
      name: opt.values.name,
      questions: questionsArr
    }
    Calls.questionaryCreate(dtoIn);
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Forms.Form
        onSave={(opt) => 
          this._handleQuestionarySave(opt, this.props.data.itemList)
          //alert(`opt.values:\n${JSON.stringify(opt.values, null, 2)}`)
        }
      >
        <UU5.Forms.Text name="name" label="name" required/>
        <UU5.Bricks.Line/>

        {this._loadCategoryPannel(this.props.data.itemList)}

        <UU5.Forms.Controls />
      </UU5.Forms.Form>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionaryCreateReady;


