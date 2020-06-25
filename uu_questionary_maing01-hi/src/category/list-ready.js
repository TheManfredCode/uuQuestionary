//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Tile from "./tile.js";
import FormModal from "../common/form-modal.js";
import CreateForm from "./create-form.js";

import LSI from "./config/category-lsi.js";
//@@viewOff:imports

export const ListReady = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "ListReady",
    classNames: {
      main: (props, state) => Config.Css.css``
    },
    lsi: LSI
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.array,
    onCreate: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      data: [],
      onCreate: dto => {
        console.log("onCreateHandler was fired");
        console.table(dto);
      },
      onUpdate: dto => {
        console.log("onCreateHandler was fired");
        console.table(dto);
      },
      onDelete: dto => {
        console.log("onCreateHandler was fired");
        console.table(dto);
      }
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
  _registerModal(cmp) {
    this._modal = cmp;
  },
  _getActions() {
    return [
      {
        content: {
          en: "Add category",
          cs: "Přidat zvíře"
        },
        onClick: () => {
          console.log("Add animal");
          this._modal.open({
            header: this.getLsiComponent("createHeader"),
            content: <CreateForm />,
            onSave: this.props.onCreate,
            controls: {
              buttonSubmitProps: {
                content: this.getLsiComponent("createButton")
              }
            }
          });
        },
        icon: "mdi-plus-circle",
        active: true
      }
    ]
  },
  _getTile(tileData) {
    return (
      <Tile tileData={tileData} />
    );
  },
  _getChild() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Tiles.ListController data={this.props.data} selectable={false} autoResize={true}>
          <UU5.Tiles.ActionBar title="Список категорий" actions={this._getActions()} />
          <UU5.Tiles.List
            tile={this._getTile}
            tileHeight={200}
            tileMinWidth={100}
            tileMaxWidth={400}
            rowSpacing={2}
            tileSpacing={2}
            tileBorder
          />
        </UU5.Tiles.ListController>
        <FormModal ref_={this._registerModal} />
      </UU5.Bricks.Div>
    );
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return this._getChild();
  }
  //@@viewOff:render
});

export default ListReady;
