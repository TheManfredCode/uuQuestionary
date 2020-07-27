//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
//@@viewOff:imports

export const QuestionaryTile = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionaryTile",
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
  _getQuestionStatistic() {
    let { questions } = this.props.data;
    let stat = 0;
    if (questions && questions.length) {
      stat = questions.length;
    }
    return <UU5.Bricks.Div>Questions: {stat}</UU5.Bricks.Div>;
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.BlockLayout.Block
        actions={[{ icon: "mdi-radioactive", content: "GO", active: true, onClick: () => {
            UU5.Environment.setRoute("/questionary", {id: this.props.data.id});
          } }]}
      >
        <UU5.BlockLayout.Row className="row">{this.props.data.name}</UU5.BlockLayout.Row>
        <UU5.BlockLayout.Line/>
        {this._getQuestionStatistic()}
      </UU5.BlockLayout.Block>
    );
  }
  //@@viewOff:render
});

export default QuestionaryTile;
