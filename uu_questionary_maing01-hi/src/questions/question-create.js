//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

export const QuestionCreateate = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionCreateate",
    classNames: {
      main: (props, state) => Config.Css.css`padding: 8px; margin: 8px 0;`
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
      1: <UU5.Bricks.Div>
          <UU5.Forms.Text 
            name="answer1" 
            label="Answer 1" 
            required 
          />
        </UU5.Bricks.Div>,
      2: <UU5.Bricks.Div>
          <UU5.Forms.Text 
            name="answer1" 
            label="Answer 1" 
            required 
          />
          <UU5.Forms.Text 
            name="answer2" 
            label="Answer2 " 
            required 
          />
        </UU5.Bricks.Div>,
      3: <UU5.Bricks.Div>
          <UU5.Forms.Text 
            name="answer1" 
            label="Answer 1" 
            required 
          />
          <UU5.Forms.Text 
            name="answer2" 
            label="Answer2 " 
            required 
          />
          <UU5.Forms.Text 
            name="answer3" 
            label="Answer 3 " 
            required 
          />
        </UU5.Bricks.Div>,
      4: <UU5.Bricks.Div>
          <UU5.Forms.Text 
            name="answer1" 
            label="Answer 1" 
            required 
          />
          <UU5.Forms.Text 
            name="answer2" 
            label="Answer2 " 
            required 
          />
          <UU5.Forms.Text 
            name="answer3" 
            label="Answer 3 " 
            required 
          />
          <UU5.Forms.Text 
            name="answer4" 
            label="Answer 4 " 
            required 
          />
        </UU5.Bricks.Div>,
      5: <UU5.Bricks.Div>
          <UU5.Forms.Text 
            name="answer1" 
            label="Answer 1" 
            required 
          />
          <UU5.Forms.Text 
            name="answer2" 
            label="Answer2 " 
            required 
          />
          <UU5.Forms.Text 
            name="answer3" 
            label="Answer 3 " 
            required 
          />
          <UU5.Forms.Text 
            name="answer4" 
            label="Answer 4 " 
            required 
          />
          <UU5.Forms.Text 
            name="answer5" 
            label="Answer 5 " 
            required 
          />
        </UU5.Bricks.Div>,  
      def: "1"
    }
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _addAnswer(){
    switch (this.state.def){
      case "1" :
        this.setState ({
          def: "2"
        })
        break;
      case "2" :
        this.setState ({
          def: "3"
        })
        break;
      case "3" :
        this.setState ({
          def: "4"
        })
        break;
      case "4" :
        this.setState ({
          def: "5"
        })
        break;
    }
  },
  _deleteAnswer(){
    switch (this.state.def){
      
      case "2" :
        this.setState ({
          def: "1"
        })
        break;
      case "3" :
        this.setState ({
          def: "2"
        })
        break;
      case "4" :
        this.setState ({
          def: "3"
        })
        break;
      case "5" :
        this.setState ({
          def: "4"
        })
        break;
    }
  },
  _onSave(optData, categoryId){
    let dtoIn = {name: "question", categoryId: categoryId};
    let answers = [];
    for (var key in optData.values) {
      if (key == "name"){
        dtoIn.name = optData.values[key];
      } else {
        answers.push(optData.values[key]);
      }
    }
    dtoIn.answers = answers;
    // for (var key in dtoIn) {
    //   console.log( "Ключ: " + key + " значение: " + dtoIn[key] );
    // }
    return Calls.questionCreate(dtoIn);
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    const {categoryId} = this.props;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Bricks.Div>{categoryId}</UU5.Bricks.Div>
      <UU5.Forms.Form
        //onSave={(opt) => alert(`opt.values:\n ${JSON.stringify(opt.values, null, 2)}`)}
        onSave={(opt) => this._onSave(opt, categoryId)}
        header={<UU5.Bricks.Box content='Create question' colorSchema='green' className='font-size-m' />}
      >
        <UU5.Forms.Text 
          name="name" 
          label="Question: " 
          placeholder="What's your favourite colour?" 
          required 
        />
        <UU5.Bricks.Button 
          onClick={this._addAnswer}
        >
          add
        </UU5.Bricks.Button>
        <UU5.Bricks.Button 
          onClick={this._deleteAnswer}
        >
          delete
        </UU5.Bricks.Button><br/>

        {this.state[this.state.def]}

        <UU5.Forms.Controls />
      </UU5.Forms.Form>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionCreateate;
