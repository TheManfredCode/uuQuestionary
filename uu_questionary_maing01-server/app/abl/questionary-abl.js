"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/questionary-error.js");

const WARNINGS = {
  QuestionaryCreateUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  QuestionaryListUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  QuestionaryGetUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  QuestionaryUpdateUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  QuestionaryDeleteUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }
};

class QuestionaryAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "questionary-types.js"));
    this.dao = DaoFactory.getDao("questionary");
  }

  //GET
  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("questionaryGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.QuestionaryGetUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut;

    try {
      dtoOut = await this.dao.get(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Get.QuestionaryDaoGetFailed({uuAppErrorMap}, e);
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
    
    let validationResult = this.validator.validate("questionaryUpdateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.QuestionaryUpdateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let dtoOut;

    try {
      dtoOut = await this.dao.update(awid, dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Update.QuestionaryDaoUpdateFailed({uuAppErrorMap}, e);
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
    let validationResult = this.validator.validate("questionaryListDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.QuestionaryListUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let dtoOut;

    try {
      dtoOut = await this.dao.list(awid, dtoIn.pageInfo);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.List.QuestionaryDaoListFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    return {
      ...dtoOut,
      uuAppErrorMap
    };
  }

  //CREATE
  async create(awid, dtoIn) {
    let validationResult = this.validator.validate("questionaryCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.QuestionaryCreateUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn,
    );
    let dtoOut;
    try {
      dtoOut = await this.dao.create({...dtoIn, awid});
    } catch (e) {
      if (e instanceof ObjectStoreError) { 
        throw new Errors.Create.QuestionaryDaoCreateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  //DELETE
  async delete(awid, dtoIn) {
    let validationResult = this.validator.validate("questionaryDeleteDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.QuestionaryDeleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    let dtoOut;

    try {
      dtoOut = await this.dao.delete(awid, dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Delete.QuestionaryDaoDeleteFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    return {
      ...dtoOut,
      uuAppErrorMap
    };
  }

}

module.exports = new QuestionaryAbl();
