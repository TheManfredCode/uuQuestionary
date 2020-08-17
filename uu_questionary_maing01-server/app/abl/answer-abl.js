"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
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
  
  //GET
  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("answerGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.AnswerGetUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut;

    try {
      dtoOut = await this.dao.get(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Get.AnswerDaoGetFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    return {
      ...dtoOut,
      uuAppErrorMap
    };
  }

  //UPDATE
  async update(awid, dtoIn) {
    let validationResult = this.validator.validate("answerUpdateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.AnswerUpdateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let dtoOut;
    let currentAnswer = await this.dao.get(awid, dtoIn.id);
    
    try {
      if (currentAnswer.completed) {
        throw new Errors.Update.IsCompleted({uuAppErrorMap});
      }
      if (dtoIn.uuId) {
        if (dtoIn.uuId != currentAnswer.uuId) {
          throw new Errors.Update.UuidIsNotCorrect({uuAppErrorMap});
        }
        delete dtoIn.uuId;
      }
      dtoOut = await this.dao.update(awid, dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Update.AnswerDaoUpdateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    return {
      ...dtoOut,
      uuAppErrorMap
    };
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
    dtoIn.completed = false;
    dtoIn.answers = {};
    dtoIn.name = "";

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

  //DELETE  
  async delete(awid, dtoIn) {
    let validationResult = this.validator.validate("answerDeleteDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.AnswerDeleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    let dtoOut;

    try {
      dtoOut = await this.dao.delete(awid, dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Delete.AnswerDaoDeleteFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    return {
      ...dtoOut,
      uuAppErrorMap
    };
  }

}

module.exports = new AnswerAbl();
