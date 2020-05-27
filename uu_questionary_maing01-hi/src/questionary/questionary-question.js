//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Config from "./config/config.js";
import QuestionaryAnswer from "./questionary-answer.js";
//@@viewOff:imports

export const QuestionaryQuestion = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionaryQuestion",
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
  _loadAnswers (ans) {
    let ansCheckbox = ans.map(el=>{
      return (
        <UU5.Forms.Checkbox label={el}/>
      );
    });
    return ansCheckbox;
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    const {name, answers} = this.props;
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>
      <UU5.Bricks.Div>{name}</UU5.Bricks.Div>
      <UU5.Tiles.ListController data={answers} selectable={false}>
        <UU5.Tiles.List
          tile={
            <QuestionaryAnswer />
          }
          tileHeight = {60}
        />
      </UU5.Tiles.ListController>
    </UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionaryQuestion;

// for (let i=0; i < ans.length; i++) {
//   return <UU5.Forms.Checkbox label={ans[i]}/>;
// }
