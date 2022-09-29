"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/lib/PackageInfo.ts
var createPackageInfo = () => {
  return {
    name: "",
    description: "",
    vendor: {
      name: "",
      github: ""
    },
    author: {
      name: "",
      email: "",
      github: ""
    }
  };
};

// src/lib/helpers.ts
var import_crypto = require("crypto");
var import_fs = require("fs");
var cp = require("child_process");
var fs = require("fs");
var util = require("util");
var runCommand = (str) => {
  cp.execSync(str, { cwd: __dirname, encoding: "utf-8", stdio: "inherit" });
};
var gitCommand = (command) => {
  return cp.execSync(`git ${command}`, {
    env: process.env,
    cwd: __dirname,
    encoding: "utf-8",
    stdio: "pipe"
  }) || "";
};
var installDependencies = (cwd = __dirname) => {
  cp.execSync("npm install", { cwd, encoding: "utf-8", stdio: "inherit" });
};
function rescue(func, defaultValue = null) {
  try {
    return func();
  } catch (e) {
    return defaultValue;
  }
}
function is_dir(path2) {
  try {
    const stat = fs.lstatSync(path2);
    return stat.isDirectory();
  } catch (e) {
    return false;
  }
}
function is_file(path2) {
  return rescue(() => fs.lstatSync(path2).isFile(), false);
}
function yn(value, { default: default_ } = {}) {
  if (default_ !== void 0 && typeof default_ !== "boolean") {
    throw new TypeError(`Expected the \`default\` option to be of type \`boolean\`, got \`${typeof default_}\``);
  }
  if (value === void 0 || value === null) {
    return default_;
  }
  value = String(value).trim();
  if (/^(?:y|ye|yes|true|1|on)$/i.test(value)) {
    return true;
  }
  if (/^(?:n|no|false|0|off)$/i.test(value)) {
    return false;
  }
  return default_;
}
var booleanToString = (value) => {
  return value ? "true" : "false";
};
var isObject = (value) => {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
};
function getPathSegments(path2) {
  return path2.split(".");
}
function isStringIndex(object, key) {
  if (typeof key !== "number" && Array.isArray(object)) {
    const index = Number.parseInt(key, 10);
    return Number.isInteger(index) && object[index] === object[key];
  }
  return false;
}
function dotget(object, path2, value = void 0) {
  if (!isObject(object) || typeof path2 !== "string") {
    return value === void 0 ? object : value;
  }
  const pathArray = getPathSegments(path2);
  if (pathArray.length === 0) {
    return value;
  }
  for (let index = 0; index < pathArray.length; index++) {
    const key = pathArray[index];
    if (isStringIndex(object, key)) {
      object = index === pathArray.length - 1 ? void 0 : null;
    } else {
      object = object[key];
    }
    if (object === void 0 || object === null) {
      if (index !== pathArray.length - 1) {
        return value;
      }
      break;
    }
  }
  return object === void 0 ? value : object;
}
function dotset(object, path2, value) {
  const assertNotStringIndex = (object2, key) => {
    if (isStringIndex(object2, key)) {
      throw new Error("Cannot use string index");
    }
  };
  const root = object;
  const pathArray = getPathSegments(path2);
  for (let index = 0; index < pathArray.length; index++) {
    const key = pathArray[index];
    assertNotStringIndex(object, key);
    if (index === pathArray.length - 1) {
      object[key] = value;
    } else if (!isObject(object[key])) {
      object[key] = typeof pathArray[index + 1] === "number" ? [] : {};
    }
    object = object[key];
  }
  return root;
}
function isEmpty(value) {
  return [void 0, null, ""].includes(value);
}
var readfile = (filename) => (0, import_fs.readFileSync)(filename, { encoding: "utf-8" });
var writefile = (filename, contents) => (0, import_fs.writeFileSync)(filename, contents, { encoding: "utf-8" });
var safeUnlink = (path2) => (0, import_fs.existsSync)(path2) && is_file(path2) && (0, import_fs.unlinkSync)(path2);
var hashString = (str) => {
  return (0, import_crypto.createHash)("sha256", { encoding: "utf-8" }).update(str).digest("hex");
};

// src/lib/filesystem/FileVariableReplacer.js
var FileVariableReplacer = class {
  static execute(filename, packageInfo) {
    let content = readfile(filename);
    const contentHash = hashString(content);
    const thisYear = String(new Date().getFullYear());
    content = content.replace(/package-skeleton/g, packageInfo.name).replace(/\{\{vendor\.name\}\}/g, packageInfo.vendor.name).replace(/\{\{vendor\.github\}\}/g, packageInfo.vendor.github).replace(/\{\{package\.name\}\}/g, packageInfo.name).replace(/\{\{package\.description\}\}/g, packageInfo.description).replace(/\{\{package\.author\.name\}\}/g, packageInfo.author.name).replace(/\{\{package\.author\.email\}\}/g, packageInfo.author.email).replace(/\{\{package\.author\.github\}\}/g, packageInfo.author.github).replace(/\{\{date\.year\}\}/g, thisYear).replace("Template Setup: run `node configure-package.js` to configure.\n", "");
    if (contentHash !== hashString(content)) {
      writefile(filename, content);
    }
  }
};

// src/lib/filesystem/DirectoryProcessor.js
var path = require("path");
var fs2 = require("fs");
var DirectoryProcessor = class {
  static execute(basePath, directory, packageInfo) {
    const files = fs2.readdirSync(directory).filter((f) => {
      return ![
        ".",
        "..",
        ".editorconfig",
        ".eslintignore",
        ".eslintrc.js",
        ".git",
        ".gitattributes",
        ".github",
        ".gitignore",
        ".prettier.config.js",
        ".prettierignore",
        "configure-package.js",
        "dist",
        "node_modules",
        "package-lock.json"
      ].includes(path.basename(f));
    });
    files.forEach((fn) => {
      const fqName = `${directory}/${fn}`;
      const relativeName = fqName.replace(basePath + "/", "");
      const isPath = is_dir(fqName);
      const kind = isPath ? "directory" : "file";
      console.log(`processing ${kind} ./${relativeName}`);
      if (isPath) {
        DirectoryProcessor.execute(basePath, fqName, packageInfo);
        return;
      }
      if (is_file(fqName)) {
        try {
          FileVariableReplacer.execute(fqName, packageInfo);
        } catch (err) {
          console.log(`Error processing file ${relativeName}`);
        }
      }
    });
  }
};

// src/utils/HttpUtils.ts
var import_https = __toESM(require("https"));
async function getJson(url) {
  const result = {
    data: null,
    error: "",
    failed: false,
    hasError: false,
    headers: {},
    statusCode: 0,
    success: false
  };
  const requestJson = async (url2) => {
    const options = {
      headers: {
        Accept: "application/json, */*",
        "User-Agent": "permafrost-dev-template-configure/1.0"
      }
    };
    return new Promise((resolve, reject) => {
      const req = import_https.default.get(url2, options);
      req.on("response", async (res) => {
        result.headers = res.headers;
        result.statusCode = res.statusCode;
        let body = "";
        res.setEncoding("utf-8");
        for await (const chunk of res) {
          body += chunk;
        }
        resolve(JSON.parse(body));
      });
      req.on("error", (err) => {
        throw new err();
      });
    });
  };
  try {
    result.data = await requestJson(url);
    result.success = true;
    result.failed = false;
    result.error = "";
    result.hasError = false;
  } catch (e) {
    result.data = null;
    result.success = false;
    result.failed = true;
    result.error = e.message;
    result.hasError = true;
  }
  return result;
}

// src/lib/GithubApiClient.ts
var GithubApiClient = class {
  static create() {
    return new GithubApiClient();
  }
  async get(endpoint) {
    return await getJson(`https://api.github.com/${endpoint.replace(/^\/+/, "")}`);
  }
  async org(name) {
    const response = await this.get(`/orgs/${name}`);
    return response.data;
  }
  async searchUsers(query, minScore = 1) {
    const response = await this.get(`/search/users?q=${query}`);
    if (!response.data) {
      return response.data;
    }
    if (response.data.total_count === 0) {
      return null;
    }
    return response.data.items.filter((item) => item.score >= minScore);
  }
  async contributors(owner, repositoryName) {
    const response = await this.get(`/repos/${owner}/${repositoryName}/contributors`);
    if (!response.data) {
      return response.data;
    }
    return response.data.filter((contributor) => contributor.type === "User");
  }
  async repository(owner, name) {
    const response = await this.get(`/repos/${owner}/${name}`);
    return response.data;
  }
  async repositoryEvents(owner, name) {
    const response = await this.get(`/repos/${owner}/${name}/events`);
    return response.data;
  }
  async user(login) {
    const response = await this.get(`users/${login}`);
    return response.data;
  }
};

// src/utils/EventUtils.ts
var EventUtils = class {
  async repositoryEvents(owner, name) {
    const client = new GithubApiClient();
    const data = await client.repositoryEvents(owner, name);
    return data ? data : [];
  }
  getPushEventsWithCommits(events) {
    return events.filter((event) => event.type === "PushEvent").filter((event) => event.payload.commits !== void 0 && event.payload.commits.length > 0);
  }
  searchPushEventsForUserInfo(events, email, fullName) {
    return this.getPushEventsWithCommits(events).filter(
      (event) => {
        var _a;
        return (_a = event.payload.commits) == null ? void 0 : _a.some((commit) => commit.author.email === email || commit.author.name === fullName);
      }
    );
  }
  searchPushEventsForEmail(events, email) {
    return this.getPushEventsWithCommits(events).filter((event) => {
      var _a;
      return (_a = event.payload.commits) == null ? void 0 : _a.some((commit) => commit.author.email === email);
    });
  }
  searchPushEventsForAuthorName(events, authorName) {
    return this.getPushEventsWithCommits(events).filter((event) => {
      var _a;
      return (_a = event.payload.commits) == null ? void 0 : _a.some((commit) => commit.author.name === authorName);
    });
  }
  searchEventsForGithubUsernameByEmail(events, email) {
    const pushEvents = this.searchPushEventsForEmail(events, email);
    return pushEvents.length ? pushEvents[0].actor.login : null;
  }
  searchEventsForGithubUsernameByAuthorName(events, email) {
    const pushEvents = this.searchPushEventsForAuthorName(events, email);
    return pushEvents.length ? pushEvents[0].actor.login : null;
  }
  async searchRepositoryCommitsForGithubUsername(owner, name, authorEmail, authorName) {
    const events = await this.repositoryEvents(owner, name);
    const result = this.searchEventsForGithubUsernameByEmail(this.searchPushEventsForEmail(events, authorEmail), authorEmail);
    if (!result) {
      return this.searchEventsForGithubUsernameByAuthorName(this.searchPushEventsForAuthorName(events, authorName), authorName);
    }
    return result;
  }
};

// src/utils/GitUtils.ts
var GitUtils = class {
  static get githubUser() {
    return gitCommand("config remote.origin.url").trim().replace(":", "/").split("/")[1];
  }
  static async githubOwnerName() {
    const client = new GithubApiClient();
    const data = await client.user(GitUtils.githubUser);
    if (!data) {
      return GitUtils.username();
    }
    return data.name;
  }
  static async githubOwnerType() {
    const client = new GithubApiClient();
    const data = await client.user(this.githubUser);
    if (!data) {
      return "Unknown" /* Unknown */;
    }
    return data.type;
  }
  static githubRepositoryName() {
    return gitCommand("config remote.origin.url").trim().replace(":", "/").split("/").pop().replace(/\.git$/, "");
  }
  static username() {
    return gitCommand("config user.name").trim();
  }
  static email() {
    return gitCommand("config user.email").trim();
  }
  static topLevelPath() {
    return gitCommand("rev-parse --show-toplevel").trim();
  }
};

// src/lib/Prompts.ts
var import_util = require("util");
var Prompts = class {
  question;
  constructor(rl) {
    this.init(rl);
  }
  init(rl) {
    if (this.question !== void 0) {
      return;
    }
    this.question = (0, import_util.promisify)(rl.question).bind(rl);
  }
  async ask(prompt, defaultValue = "") {
    let result = "";
    try {
      result = await this.question(`${prompt} ${defaultValue.length ? "(" + defaultValue + ") " : ""}`);
    } catch (err) {
      result = defaultValue;
    }
    return new Promise((resolve) => {
      if (result.trim().length === 0) {
        result = defaultValue;
      }
      resolve(result);
    });
  }
  async boolean(str, defaultValue = false) {
    const resultStr = await this.ask(`${str} `, defaultValue);
    const value = typeof resultStr === "boolean" ? booleanToString(resultStr) : resultStr;
    return yn(value, { default: defaultValue });
  }
  async conditional(obj, path2, prompt, allowEmpty = false) {
    const value = dotget(obj, path2);
    while (true) {
      dotset(obj, path2, await this.ask(prompt, value));
      if (allowEmpty && isEmpty(dotget(obj, path2, ""))) {
        break;
      }
      if (!isEmpty(dotget(obj, path2, ""))) {
        break;
      }
    }
    return dotget(obj, path2);
  }
};

// src/Script.ts
var import_readline = __toESM(require("readline"));

// src/utils/GithubUtils.ts
var GithubUtils = class {
  static async getRepositoryDescription(owner, name) {
    var _a;
    return ((_a = await GithubApiClient.create().repository(owner, name)) == null ? void 0 : _a.description) ?? "";
  }
};
__publicField(GithubUtils, "configFilename", (name) => `${__dirname}/.github/${name}.yml`);
__publicField(GithubUtils, "workflowFilename", (name) => `${__dirname}/.github/workflows/${name}.yml`);

// src/lib/Repository.ts
var Repository = class {
  name;
  owner;
  path;
  constructor() {
    this.path = GitUtils.topLevelPath();
    this.owner = GitUtils.githubUser;
    this.name = GitUtils.githubRepositoryName();
  }
  workflowFile(name) {
    return this.githubFile(`workflows/${name}`);
  }
  githubFile(name) {
    return `${this.path}/.github/${name}.yml`;
  }
  async getDescription() {
    return await GithubUtils.getRepositoryDescription(this.owner, this.name);
  }
};

// src/Script.ts
var Script = class {
  rl;
  pkg = createPackageInfo();
  prompts;
  repository;
  constructor() {
    this.rl = import_readline.default.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.prompts = new Prompts(this.rl);
    this.repository = new Repository();
  }
  destroy() {
    this.rl.close();
  }
  async initPackageInfo() {
    const authorUsername = await new EventUtils().searchRepositoryCommitsForGithubUsername(
      GitUtils.githubUser,
      GitUtils.githubRepositoryName(),
      GitUtils.email(),
      GitUtils.username()
    );
    this.pkg = createPackageInfo();
    this.pkg.name = this.repository.name;
    this.pkg.description = await this.repository.getDescription();
    this.pkg.author.name = GitUtils.username();
    this.pkg.author.email = GitUtils.email();
    this.pkg.author.github = authorUsername ?? this.repository.owner;
    this.pkg.vendor.name = await GitUtils.githubOwnerName();
    this.pkg.vendor.github = this.repository.owner;
  }
  async populatePackageInfo() {
    const prompts = [
      { path: "name", prompt: "package name?" },
      { path: "description", prompt: "package description?" },
      { path: "author.name", prompt: "author name?" },
      { path: "author.email", prompt: "author email?" },
      { path: "author.github", prompt: "author github username?" },
      { path: "vendor.name", prompt: "vendor name?" },
      { path: "vendor.github", prompt: "vendor github org/username?" }
    ];
    for (const prompt of prompts) {
      await this.prompts.conditional(this.pkg, prompt.path, prompt.prompt);
    }
  }
  async run() {
    console.log("Retrieving github data...");
    await this.initPackageInfo();
    await this.populatePackageInfo();
    await this.confirmRunOrExit();
    if (await this.processRepositoryFiles()) {
      this.installDependencies();
    }
    this.destroy();
    this.unlink();
    this.commitChanges();
  }
  async confirmRunOrExit() {
    const confirm = await this.prompts.boolean("Process files (will modify files)? ", false);
    if (!confirm) {
      console.log("Not processing files. Exiting script.");
      this.destroy();
      process.exit(1);
    }
  }
  async processRepositoryFiles() {
    try {
      DirectoryProcessor.execute(this.repository.path, this.repository.path, this.pkg);
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }
  installDependencies() {
    console.log("Installing dependencies...");
    installDependencies(this.repository.path);
  }
  unlink() {
    try {
      console.log("Done, removing this script.");
      safeUnlink(__filename);
    } catch (err) {
      console.log(err.message);
    }
  }
  commitChanges() {
    try {
      console.log("Committing changes...");
      runCommand("git add .");
      runCommand('git commit -m"initial commit"');
    } catch (err) {
      console.log(err.message);
    }
  }
};

// src/index.ts
async function main() {
  const script = new Script();
  if (process.cwd().endsWith("dist")) {
    process.chdir(script.repository.path);
  }
  await script.run();
  process.exit(0);
}
main();
