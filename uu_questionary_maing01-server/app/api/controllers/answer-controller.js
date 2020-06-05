"use strict";
const AnswerAbl = require("../../abl/answer-abl.js");

class AnswerController {

  list(ucEnv) {
    return AnswerAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return AnswerAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new AnswerController();
