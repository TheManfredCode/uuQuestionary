"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/category-error.js");

const WARNINGS = {
  CategoryCreateUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  CategoryListUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  CategoryGetUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  CategoryUpdateUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  CategoryAddQuestionUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  CategoryDeleteUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }
};

class CategoryAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "category-types.js"));
    this.dao = DaoFactory.getDao("category");
  }

  //GET
  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("categoryGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.CategoryGetUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut;

    try {
      dtoOut = await this.dao.get(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Get.CategoryDaoGetFailed({uuAppErrorMap}, e);
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
    let validationResult = this.validator.validate("categoryListDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.CategoryListUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let dtoOut;

    try {
      dtoOut = await this.dao.list(awid, dtoIn.pageInfo);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.List.CategoryDaoListFailed({uuAppErrorMap}, e);
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
    let validationResult = this.validator.validate("categoryUpdateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.CategoryUpdateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let dtoOut;
    
    try {
      
      dtoOut = await this.dao.update(awid, dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Update.CategoryDaoUpdateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    return {
      ...dtoOut,
      uuAppErrorMap
    };
  }

  //ADD QUESTION
  async addQuestion(awid, dtoIn) {
    let validationResult = this.validator.validate("categoryAddQuestionDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.CategoryAddQuestionUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let dtoOut;
     
    let questions = await this.dao.get(awid, dtoIn.id);
    questions.questions.push(dtoIn.questions);
    dtoIn.questions = questions.questions;

    try {
      dtoOut = await this.dao.update(awid, dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Update.CategoryDaoAddQuestionFailed({uuAppErrorMap}, e);
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
    let validationResult = this.validator.validate("categoryCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.CategoryCreateUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn,
    );
    let dtoOut;
    dtoIn.questions = [];
    try {
      dtoOut = await this.dao.create({...dtoIn, awid});
    } catch (e) {
      if (e instanceof ObjectStoreError) { 
        throw new Errors.Create.CategoryDaoCreateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  //DELETE
  async delete(awid, dtoIn) {
    let validationResult = this.validator.validate("categoryDeleteDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.CategoryDeleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    let dtoOut;

    try {
      dtoOut = await this.dao.delete(awid, dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Delete.CategoryDaoDeleteFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    return {
      ...dtoOut,
      uuAppErrorMap
    };
  }

}

module.exports = new CategoryAbl();
