//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5g04-block-layout";
import "uu5tilesg01";
import Config from "../config/config.js";
//@@viewOff:imports

export const QuestionTile = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "QuestionTile",
    classNames: {
      main: (props, state) => Config.Css.css``
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      data: {}
    };
  },

  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _getAnswersList(answers) {
    let children = answers.map(element => {
      return <UU5.Bricks.Li key={UU5.Common.Tools.generateUUID()} content={element} />;
    });

    return <UU5.Bricks.Ul>{children}</UU5.Bricks.Ul>;
  },
  _getChild() {
    let { name, answers } = this.props.data;
    return (
      <UU5.BlockLayout.Block
        actions={[
          {
            content: "Edit",
            active: false,
            onClick: () => {
              // UU5.Environment.setRoute("/category/detail", { id: this.props.data.id });
            }
          },
          {
            content: "Delete",
            active: false,
            onClick: () => {
              //tuguduk
            }
          }
        ]}
      >
        <UU5.BlockLayout.Row className="row">{name}</UU5.BlockLayout.Row>
        <UU5.BlockLayout.Line />
        {this._getAnswersList(answers)}
      </UU5.BlockLayout.Block>
    );
  },

  //@@viewOff:private

  //@@viewOn:render
  render() {
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>{this._getChild()}</UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default QuestionTile;
