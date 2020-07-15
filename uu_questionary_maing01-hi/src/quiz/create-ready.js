//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

export const CreateReady = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "CreateReady",
    classNames: {
      main: (props, state) => Config.Css.css``
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.array,
    onCreate: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      data: [],
      onCreate: dto => {
        console.log("onCreateHandler was fired");
        console.table(dto);
      }
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  getInitialState() {
    return {
      selected: []
    };
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _printOptions(category) {
    let questions = category.questions;
    return questions.map((question, index) => {
      return (
        <UU5.Bricks.Row key={"q" + category.id + index}>
          <UU5.Bricks.Column colWidth="m-10">{question.name}</UU5.Bricks.Column>
          <UU5.Bricks.Column colWidth="m-2">
            <UU5.Bricks.TouchIcon
              icon="mdi-chevron-double-right"
              bgStyle="transparent"
              onClick={event => {
                let select = {
                  categoryId: category.id,
                  question: question
                };
                console.table(select);
                let prev = this.state.selected;
                prev.push(select);
                this.setState({
                  selected: prev
                });
                //todo copy this button and disable
              }}
            />
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>
      );
    });
  },

  _getPanels() {
    let panels = [];
    const { data: availabeData } = this.props;
    if (availabeData) {
      availabeData.forEach((category, index) => {
        panels.push(
          <UU5.Bricks.Panel
            key={"c" + category.id + index}
            header={category.name}
            iconExpanded="mdi-chevron-up"
            iconCollapsed="mdi-chevron-down"
          >
            {this._printOptions(category)}
          </UU5.Bricks.Panel>
        );
      });
    } else {
      panels.push(<UU5.Bricks.Panel header="Panel 1" content="No data available" />);
    }
    return panels;
  },
  _getAvailable() {
    return <UU5.Bricks.Accordion size="l">{this._getPanels()}</UU5.Bricks.Accordion>;
  },
  //================ Availabel -> Panels - Options

  _getExistsPanels() {
    let panels = [];
    const { data: availabeData } = this.props;
    if (availabeData) {
      availabeData.forEach((category, index) => {
        panels.push(
          <UU5.Bricks.Panel
            key={"c" + category.id + index}
            header={category.name}
            iconExpanded="mdi-chevron-up"
            iconCollapsed="mdi-chevron-down"
          >
            {this._printOptions(category)}
          </UU5.Bricks.Panel>
        );
      });
    } else {
      panels.push(<UU5.Bricks.Panel header="Panel 1" content="No data available" />);
    }
    return panels;
  },

  _printExistsOptions(category) {
    let questions = category.questions;
    let q = [];
    this.state.selected.forEach(el => {
      if (el.categoryId === category.id) {
        questions.forEach(question => {
          if (question.name === el.question.name) {
            q.push(question);
          }
        });
      }
    });
    return q.map((question, index) => {
      return (
        <UU5.Bricks.Row key={"q" + category.id + index}>
          <UU5.Bricks.Column colWidth="m-10">{question.name}</UU5.Bricks.Column>
          <UU5.Bricks.Column colWidth="m-2">
            <UU5.Bricks.TouchIcon
              icon="mdi-chevron-double-right"
              bgStyle="transparent"
              onClick={event => {
                //todo remove
              }}
            />
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>
      );
    });
  },

  _getExists() {
    let panels = [];
    const { data: availabeData } = this.props;
    if (availabeData && this.state.selected) {
      let filteredValues = availabeData.filter(el => {
        let sel = this.state.selected;
        let c = sel.filter(s => {
          if (s.categoryId === el.id) {
            //todo add filter for questions
            return el;
          }
        });
        if (c.length > 0) {
          return el;
        }
      });
      filteredValues.forEach((category, index) => {
        panels.push(
          <UU5.Bricks.Panel
            key={"c" + category.id + index}
            header={category.name}
            iconExpanded="mdi-chevron-up"
            iconCollapsed="mdi-chevron-down"
          >
            {this._printExistsOptions(category)}
          </UU5.Bricks.Panel>
        );
      });
    } else {
      panels.push(<UU5.Bricks.Panel header="Panel 1" content="No data" />);
    }
    return panels;
  },

  _getChild() {
    return (
      <UU5.Bricks.Table striped bordered header="New Quiz" footer="smile :)">
        <UU5.Bricks.Table.THead>
          <UU5.Bricks.Table.Tr>
            <UU5.Bricks.Table.Th content="Availabe" />
            <UU5.Bricks.Table.Th content="Exists" />
          </UU5.Bricks.Table.Tr>
        </UU5.Bricks.Table.THead>

        <UU5.Bricks.Table.TBody>
          <UU5.Bricks.Table.Tr>
            <UU5.Bricks.Table.Td>{this._getAvailable()}</UU5.Bricks.Table.Td>
            <UU5.Bricks.Table.Td>{this._getExists()}</UU5.Bricks.Table.Td>
          </UU5.Bricks.Table.Tr>
        </UU5.Bricks.Table.TBody>
      </UU5.Bricks.Table>
    );
  },

  _createQuiz(dtoIn) {
    return new Promise((resolve, reject) => {
      Calls.quizeSave({
        done: data => {
          console.log(data);
          //go to assign route
        },
        fail: reject
      });
    });
  },

  _continue() {
    console.table(this.state.selected);
    this._createQuiz(this.state.selected);
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        {this._getChild()}
        <UU5.Bricks.Button onClick={this._continue}>Continue</UU5.Bricks.Button>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default CreateReady;
