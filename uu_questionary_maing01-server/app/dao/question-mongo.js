"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class QuestionMongo extends UuObjectDao {

  async createSchema(){
  }

  async create(dtoIn) {
    return await super.insertOne(dtoIn);
  }
  async update(awid, dtoIn) {
    return await super.findOneAndUpdate({ awid, id: dtoIn.id }, dtoIn, "NONE");
  }
  async list(awid, pageInfo) {
    return await super.find({ awid }, pageInfo);
  }

  async listSort(filter, sortBy, order, pageInfo,) {
    let sort = {
      [sortBy]: order === "asc" ? 1 : -1
    };
    return await super.find(filter, pageInfo, sort);
  }

  async get(awid, id) {
    return await super.findOne({ awid, id });
  }
  async delete(awid, { id }) {
    await super.deleteOne({ awid, id });
  }
}

module.exports = QuestionMongo;
