//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Calls from "calls";
import "uu5tilesg01";
import Config from "../config/config.js";
import QuestionReady from "./question-ready.js";
import QuestionCheckbox from "./question-checkbox.js";
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
    }
  },

  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  //
  // _loadQuestion(dtoIn) {
  //   dtoIn = this.props.data;
  //   return new Promise((resolve, reject) => {
  //     Calls.questionGet({
  //       data: {id: dtoIn},
  //       done: data =>
  //         resolve(
  //           data
  //         ),
  //       fail: response => reject(response)
  //     });
  //   });
  // },
  _getChild() {
    let {name} = this.props.data;
    return (
      <UU5.Bricks.Div>
        {name}
      </UU5.Bricks.Div>
    );
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (<UU5.Bricks.Div {...this.getMainPropsToPass()}>

      {this._getChild()}

    </UU5.Bricks.Div>);
  }
  //@@viewOff:render
});

export default QuestionTile;
