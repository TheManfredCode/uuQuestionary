//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5g04-block-layout";
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
    let { questions } = this.props.tileData;
    let stat = 0;
    if (questions && questions.length) {
      stat = questions.length;
    }
    return <UU5.Bricks.Div>Questions: {stat}</UU5.Bricks.Div>;
  },
  _getChildren() {
    return (
      <UU5.BlockLayout.Block
        actions={[{ icon: "mdi-settings", content: "Settings", active: true, onClick: () => {
            UU5.Environment.setRoute("/category/detail", {id: this.props.tileData.id});
          } }]}
      >
        <UU5.BlockLayout.Row className="row">{this.props.tileData.name}</UU5.BlockLayout.Row>
        <UU5.BlockLayout.Line/>
        {this._getQuestionStatistic()}
      </UU5.BlockLayout.Block>
    );
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return <UU5.Bricks.Div {...this.getMainPropsToPass()}>{this._getChildren()}</UU5.Bricks.Div>;
  }
  //@@viewOff:render
});

export default Tile;
