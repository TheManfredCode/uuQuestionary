//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
//@@viewOff:imports

export const Tile = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Tile",
    classNames: {
      main: (props, state) => Config.Css.css``
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    tileData: UU5.PropTypes.object
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      tileData: {}
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
  _getQuestionStatistic() {
    let {questions} = this.props.tileData;
    let stat = 0;
    if (questions && questions.length) {
      stat = questions.length;
    }
    return (
      <UU5.Bricks.Div>
        Questions: {stat}
      </UU5.Bricks.Div>
    );
  },
  _detailLink() {
    let link = "category/detail?id=" + this.props.tileData.id;
    return (
      <UU5.Bricks.Link href={link}>
        Details...
      </UU5.Bricks.Link>
    );
  },
  _getChildren() {
    return (
      <UU5.Bricks.Span>
        {this.props.tileData.name}
        {this._getQuestionStatistic()}
        {this._detailLink()}
      </UU5.Bricks.Span>
    );
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>{this._getChildren()}</UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default Tile;