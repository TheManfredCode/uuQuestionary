//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
//@@viewOff:imports

export const FilterSelect = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "FilterSelect",
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
  _handleButton() {
    
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Forms.Form>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="xs-12 s-6 m-5 l-4 xl-3" noSpacing>
              <UU5.Forms.Select
                name="value"
              >
                <UU5.Forms.Select.Option value="Completed" />
                <UU5.Forms.Select.Option value="Not completed" />
              </UU5.Forms.Select>
            </UU5.Bricks.Column>

            <UU5.Bricks.Column colWidth="xs-12 s-6 m-2 xl-1">
              <UU5.Bricks.Button
                onClick={this._handleButton}
                colorSchema="green"
                style={{ marginTop: "24px" }}
              >
                <UU5.Bricks.Icon icon="mdi-paw" />
              </UU5.Bricks.Button>
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>

        </UU5.Forms.Form>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default FilterSelect;
