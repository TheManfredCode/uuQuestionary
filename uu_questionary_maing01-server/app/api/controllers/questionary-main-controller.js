"use strict";
const QuestionaryMainAbl = require("../../abl/questionary-main-abl.js");

class QuestionaryMainController {
  init(ucEnv) {
    return QuestionaryMainAbl.init(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new QuestionaryMainController();
