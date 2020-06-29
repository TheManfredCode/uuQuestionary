"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/question-error.js");

const WARNINGS = {
  QuestionCreateUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  QuestionListUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  QuestionGetUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  QuestionUpdateUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  QuestionDeleteUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }
};

class QuestionAbl {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "question-types.js"));
    this.dao = DaoFactory.getDao("question");
    this.categoryDao = DaoFactory.getDao("category");
  }

  //inCategoryList

  async inCategoryList(awid, dtoIn) {


    
    let dtoOut;
    const { categoryId, sortBy, pageInfo } = dtoIn;
    let order="asc";

    dtoOut = await this.dao.listSort({awid, categoryId}, sortBy, order, pageInfo)

    return {
      ...dtoOut,
      uuAppErrorMap
    };
  }

  //GET
  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("questionGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.QuestionGetUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut;

    try {
      dtoOut = await this.dao.get(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Get.QuestionDaoGetFailed({uuAppErrorMap}, e);
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
    let validationResult = this.validator.validate("questionListDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.QuestionListUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let dtoOut = {itemList: []};
    const { categoryId, sortBy, pageInfo } = dtoIn;
    let order="asc";

    //let categoryQuestions = await this.categoryDao.get(awid, dtoIn.categoryId);
    //let questionList = categoryQuestions.questions;

    try {

      // console.log ("KKKKKKKKKKKKKKKKKKKKKKKKK" + questionList)
      // let lot
      // let lotArray = [];
      // for (let i = 0; i < questionList.length; i++) {
      //   lot = await this.dao.get(awid, questionList[i]);
      //   lotArray.push(lot);
      // }
      // dtoOut.itemList = lotArray;
      if (categoryId) {
        dtoOut = await this.dao.listSort({awid, categoryId}, sortBy, order, pageInfo);
      } else {
        dtoOut = await this.dao.list(awid, pageInfo);
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.List.QuestionDaoListFailed({uuAppErrorMap}, e);
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
    let validationResult = this.validator.validate("questionUpdateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.QuestionUpdateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let dtoOut;

    try {
      dtoOut = await this.dao.update(awid, dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Update.QuestionDaoUpdateFailed({uuAppErrorMap}, e);
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
    let validationResult = this.validator.validate("questionCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.QuestionCreateUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn,
    );
    let categoryQuestions = await this.categoryDao.get(awid, dtoIn.categoryId);
    
    let dtoOut;
    try {
      dtoOut = await this.dao.create({...dtoIn, awid});

      //console.log("AAAAAAAAAAAAAAAAAAAAAAAAA" + dtoIn.categoryId);
      categoryQuestions.questions.push(dtoOut.id)
      // let categoryQuestionsNew = categoryQuestions.questions;
      let categoryDtoIn = {
        id:"",
        questions: []
      };
      categoryDtoIn.id = dtoIn.categoryId;
      categoryDtoIn.questions = categoryQuestions.questions;
      await this.categoryDao.update(awid, categoryDtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) { 
        throw new Errors.Create.QuestionDaoCreateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  //DELETE
  async delete(awid, dtoIn) {
    let validationResult = this.validator.validate("questionDeleteDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.QuestionDeleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    let dtoOut;

    try {
      dtoOut = await this.dao.delete(awid, dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Delete.QuestionDaoDeleteFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    return {
      ...dtoOut,
      uuAppErrorMap
    };
  }

}

module.exports = new QuestionAbl();
