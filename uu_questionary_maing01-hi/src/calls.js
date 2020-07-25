/**
 * Server calls of application client.
 */
import * as UU5 from "uu5g04";
import Plus4U5 from "uu_plus4u5g01";

let Calls = {
  /** URL containing app base, e.g. "https://uuos9.plus4u.net/vnd-app/awid/". */
  APP_BASE_URI: location.protocol + "//" + location.host + UU5.Environment.getAppBasePath(),

  async call(method, url, dtoIn, clientOptions) {
    let response = await Plus4U5.Common.Calls.call(method, url, dtoIn, clientOptions);
    return response.data;
  },

  loadDemoContent(dtoIn) {
    let commandUri = Calls.getCommandUri("loadDemoContent");
    return Calls.call("get", commandUri, dtoIn);
  },

  // Category cmd

  categoryCreate(dtoInData) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("category/create");
      Calls.call("post", commandUri, {
        data: dtoInData,
        done: data => resolve({ ...data, inProgress: false }),
        fail: reject
      });
    });
  },

  categoryList(dtoInData) {
    let commandUri = Calls.getCommandUri("category/list");
    return Calls.call("get", commandUri, dtoInData);
  },

  categoryGet(dtoInData) {
    let commandUri = Calls.getCommandUri("category/get");
    return Calls.call("get", commandUri, dtoInData);
  },

  categoryUpdate(dtoInData){
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("category/update");
      Calls.call("post", commandUri, {
        data: dtoInData,
        done: data => resolve({ data}),
        fail: reject
      });
    });
  },

  categoryDelete(id) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("category/delete");
      Calls.call("post", commandUri, { data: { id }, done: resolve, fail: reject });
    });
  },

  categoryAddQuestion(id, newQuestion) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("category/addQuestion");
      Calls.call("post", commandUri, {
        data: {
          id: id,
          questions: newQuestion
        },
        done: data => resolve(data),
        fail: reject
      });
    });
  },

  // Question cmd

  questionGet(dtoInData) {
    let commandUri = Calls.getCommandUri("question/get");
    return Calls.call("get", commandUri, dtoInData);
  },

  questionList(dtoInData) {
    let commandUri = Calls.getCommandUri("question/list");
    return Calls.call("get", commandUri, dtoInData);
  },

  questionCreate(dtoInData) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("question/add");
      Calls.call("post", commandUri, {
        data: dtoInData,
        done: data => resolve({ data}),
        fail: reject
      });
    });
  },

  // Questionary cmd

  questionaryGet(dtoInData) {
    let commandUri = Calls.getCommandUri("questionary/get");
    return Calls.call("get", commandUri, dtoInData);
  },
  questionaryCreate(dtoInData) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("questionary/create");
      Calls.call("post", commandUri, {
        data: dtoInData,
        done: data => resolve({ data}),
        fail: reject
      });
    });
  },
  questionaryList(){
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("questionary/list");
      Calls.call("get", commandUri, {done: resolve, fail: reject });
    });
  },


  /*
  For calling command on specific server, in case of developing client site with already deployed
  server in uuCloud etc. You can specify url of this application (or part of url) in development
  configuration in *-client/env/development.json, for example:
   {
     ...
     "uu5Environment": {
       "gatewayUri": "https://uuos9.plus4u.net",
       "tid": "84723877990072695",
       "awid": "b9164294f78e4cd51590010882445ae5",
       "vendor": "uu",
       "app": "demoappg01",
       "subApp": "main"
     }
   }
   */
  getCommandUri(aUseCase) {
    // useCase <=> e.g. "getSomething" or "sys/getSomething"
    // add useCase to the application base URI
    let targetUriStr = Calls.APP_BASE_URI + aUseCase.replace(/^\/+/, "");

    // override tid / awid if it's present in environment (use also its gateway in such case)
    if (process.env.NODE_ENV !== "production") {
      let env = UU5.Environment;
      if (env.tid || env.awid || env.vendor || env.app) {
        let url = Plus4U5.Common.Url.parse(targetUriStr);
        if (env.tid || env.awid) {
          if (env.gatewayUri) {
            let match = env.gatewayUri.match(/^([^:]*):\/\/([^/]+?)(?::(\d+))?(\/|$)/);
            if (match) {
              url.protocol = match[1];
              url.hostName = match[2];
              url.port = match[3];
            }
          }
          if (env.tid) url.tid = env.tid;
          if (env.awid) url.awid = env.awid;
        }
        if (env.vendor || env.app) {
          if (env.vendor) url.vendor = env.vendor;
          if (env.app) url.app = env.app;
          if (env.subApp) url.subApp = env.subApp;
        }
        targetUriStr = url.toString();
      }
    }

    return targetUriStr;
  }
};

export default Calls;
