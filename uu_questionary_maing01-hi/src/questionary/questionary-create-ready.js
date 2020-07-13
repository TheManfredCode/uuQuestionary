//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
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
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Forms.Form
        onSave={(opt) => alert(`opt.values:\n${JSON.stringify(opt.values, null, 2)}`)}
      >
        {this._loadCategoryPannel(this.props.data.itemList)}

        <UU5.Forms.Controls />
      </UU5.Forms.Form>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionaryCreateReady;

// <UU5.Bricks.Accordion onClickNotCollapseOthers>
//           <UU5.Bricks.Panel header="Panel 1" content={[
//             <UU5.Forms.Checkbox label="HII" name="test1.1" />,
//             <UU5.Forms.Checkbox label="HII" name="test1.2" />
//         ]} />
//           <UU5.Bricks.Panel header="Panel 2" content={<UU5.Forms.Checkbox label="HII" name="test2" />} />
//           <UU5.Bricks.Panel header="Panel 3" content={<UU5.Forms.Checkbox label="HII" name="test3" />} />
//           <UU5.Bricks.Panel header="Panel 4" content={<UU5.Forms.Checkbox label="HII 2" name="test4" />} />
//           <UU5.Bricks.Panel header="Panel 5" content={<UU5.Forms.Checkbox label="HII 3" name="test5" />} />
//         </UU5.Bricks.Accordion>
