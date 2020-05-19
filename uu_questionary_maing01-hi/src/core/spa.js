//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";
import "uu_plus4u5g01-app";

import Config from "./config/config.js";
import SpaAuthenticated from "./spa-authenticated.js";
//@@viewOff:imports

const Spa = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Spa",
    classNames: {
      main: () => Config.Css.css`
        .plus4u5-app-page-left-wrapper {
          border-right: 1px solid rgba(0, 0, 0, 0.12);
        }
      `
    },
    getDerivedStateFromError(error) {
      return { error };
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
      error: null
    };
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <Plus4U5.App.Spa appName="uuQuestionary">
        <SpaAuthenticated {...this.getMainPropsToPass()} />
      </Plus4U5.App.Spa>
    );
  }
  //@@viewOff:render
});

export default Spa;
