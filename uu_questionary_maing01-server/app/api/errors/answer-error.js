"use strict";

const QuestionaryMainUseCaseError = require("./questionary-main-use-case-error.js");
const ANSWER_ERROR_PREFIX = `${QuestionaryMainUseCaseError.ERROR_PREFIX}answer/`;

const Create = {
  UC_CODE: `${ANSWER_ERROR_PREFIX}create/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AnswerDaoCreateFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}DAOCreatedFailed`;
      this.message = "Create DAO failed.";
    }
  }
};

const List = {
  UC_CODE: `${ANSWER_ERROR_PREFIX}list/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AnswerDaoCreateFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}DAOListFailed`;
      this.message = "List DAO failed.";
    }
  }
};

module.exports = {
  List,
  Create
};
