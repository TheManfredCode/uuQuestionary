"use strict";

const QuestionaryMainUseCaseError = require("./questionary-main-use-case-error.js");
const QUESTION_ERROR_PREFIX = `${QuestionaryMainUseCaseError.ERROR_PREFIX}question/`;

const Create = {
  UC_CODE: `${QUESTION_ERROR_PREFIX}create/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  QuestionDaoCreateFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}DAOCreatedFailed`;
      this.message = "Create DAO failed.";
    }
  }
};

const Update = {
  UC_CODE: `${QUESTION_ERROR_PREFIX}update/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  QuestionDaoUpdateFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}DAOUpdateFailed`;
      this.message = "Update DAO failed.";
    }
  }
};

const List = {
  UC_CODE: `${QUESTION_ERROR_PREFIX}list/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  QuestionDaoListFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}DAOListFailed`;
      this.message = "List DAO failed.";
    }
  }
};

const Get = {
  UC_CODE: `${QUESTION_ERROR_PREFIX}get/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  QuestionDaoGetFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}DAOGetFailed`;
      this.message = "Get DAO failed.";
    }
  }
};

const Delete = {
  UC_CODE: `${QUESTION_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  QuestionDaoDeleteFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}DAODeleteFailed`;
      this.message = "Delete DAO failed.";
    }
  }
};

module.exports = {
  Create,
  Update,
  List,
  Get,
  Delete
};
