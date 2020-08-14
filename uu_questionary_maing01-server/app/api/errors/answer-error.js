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

const Update = {
  UC_CODE: `${ANSWER_ERROR_PREFIX}list/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AnswerDaoUpdateFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}DAOUpdateFailed`;
      this.message = "Update DAO failed.";
    }
  }
};

const Get = {
  UC_CODE: `${ANSWER_ERROR_PREFIX}get/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AnswerDaoGetFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}DAOGetFailed`;
      this.message = "Get DAO failed.";
    }
  }
};

const Delete = {
  UC_CODE: `${ANSWER_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AnswerDaoDeleteFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}DAODeleteFailed`;
      this.message = "Delete DAO failed.";
    }
  }
};

module.exports = {
  Delete,
  Get,
  Update,
  List,
  Create
};
