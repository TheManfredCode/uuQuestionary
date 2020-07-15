//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import * as Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";

import Config from "./config/config.js";
import Lsi from "../config/lsi.js";
import Left from "./left.js";
import Bottom from "./bottom.js";
import About from "../routes/about.js";
import Home from "../routes/home.js";
import Categories from "../routes/categories.js";
import QuestionaryCreate from "../routes/questionary-create.js";
import Questionary from "../routes/questionary.js";
import CategoryDetail from "../routes/category-detail.js";
import QuizList from "../routes/quiz-list.js";
import QuizCreate from "../routes/quiz-create.js";

//@@viewOff:imports

const SpaAuthenticated = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "SpaAuthenticated",
    classNames: {
      main: ""
    },
    lsi: {
      name: Lsi.appName
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
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <Plus4U5.App.Page
        {...this.getMainPropsToPass()}
        top={<Plus4U5.App.Top content={this.getLsiComponent("name")} />}
        bottom={<Bottom />}
        type={2}
        displayedLanguages={["cs", "en"]}
        left={<Left />}
        leftWidth="!xs-320px !s-320px !m-256px l-256px xl-256px"
      >
        <UU5.Common.Router
          routes={{
            "": "home",
            home: { component: <Home /> },
            categories: { component: <Categories /> },
            "category/detail": { component: <CategoryDetail /> },
            "questionary/create": { component: <QuestionaryCreate /> },
            "quiz/list": { component: <QuizList /> },
            "quiz/create": { component: <QuizCreate /> },
            questionary: { component: <Questionary /> },
            about: { component: <About /> }
          }}
          controlled={false}
        />
      </Plus4U5.App.Page>
    );
  }
  //@@viewOff:render
});

export default SpaAuthenticated;
