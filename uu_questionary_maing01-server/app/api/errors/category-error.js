"use strict";

const QuestionaryMainUseCaseError = require("./questionary-main-use-case-error.js");
const CATEGORY_ERROR_PREFIX = `${QuestionaryMainUseCaseError.ERROR_PREFIX}category/`;

const Create = {
  UC_CODE: `${CATEGORY_ERROR_PREFIX}create/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  CategoryDaoCreateFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}DAOCreatedFailed`;
      this.message = "Create DAO failed.";
    }
  }
};

const Update = {
  UC_CODE: `${CATEGORY_ERROR_PREFIX}update/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  CategoryDaoUpdateFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}DAOUpdateFailed`;
      this.message = "Update DAO failed.";
    }
  }
};

const List = {
  UC_CODE: `${CATEGORY_ERROR_PREFIX}list/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  CategoryDaoListFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}DAOListFailed`;
      this.message = "List DAO failed.";
    }
  }
};

const Get = {
  UC_CODE: `${CATEGORY_ERROR_PREFIX}get/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  CategoryDaoGetFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}DAOGetFailed`;
      this.message = "Get DAO failed.";
    }
  }
};

const Delete = {
  UC_CODE: `${CATEGORY_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  CategoryDaoDeleteFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}DAODeleteFailed`;
      this.message = "Delete DAO failed.";
    }
  }
};

const AddQuestion = {
  UC_CODE: `${CATEGORY_ERROR_PREFIX}addQuestion/`,
  
  InvalidDtoIn: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  CategoryDaoAddQuestionFailed: class extends QuestionaryMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}DAOAddQuestionFailed`;
      this.message = "AddQuestion DAO failed.";
    }
  }
};

module.exports = {
  AddQuestion,
  Delete,
  Get,
  List,
  Update,
  Create
};
