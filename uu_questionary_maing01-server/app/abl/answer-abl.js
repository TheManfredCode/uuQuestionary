"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/answer-error.js");

const WARNINGS = {
  AnswerCreateUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  AnswerListUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  AnswerGetUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  AnswerUpdateUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  AnswerDeleteUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }
};

class AnswerAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "answer-types.js"));
    this.dao = DaoFactory.getDao("answer");
  }

  //LIST
  async list(awid, dtoIn) {
    let validationResult = this.validator.validate("answerListDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.AnswerListUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let dtoOut;

    try {
      dtoOut = await this.dao.list(awid, dtoIn.pageInfo);
    } catch (e) {
      if (e instanceof ObjectStoreError) { 
        throw new Errors.List.AnswerDaoListFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    return {
      ...dtoOut,
      uuAppErrorMap
    };
  }

  // CREATE
  async create(awid, dtoIn) {
    let validationResult = this.validator.validate("answerCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.AnswerCreateUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn,
    );
    let dtoOut;
    try {
      dtoOut = await this.dao.create({...dtoIn, awid});
    } catch (e) {
      if (e instanceof ObjectStoreError) { 
        throw new Errors.Create.AnswerDaoCreateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new AnswerAbl();
