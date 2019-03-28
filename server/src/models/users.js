const axios = require("axios");
const jsdom = require("js-dom");
const { JSDOM } = jsdom;

function getBody(response) {
  return response.body;
}

function parseHtml(body) {
  return new JSDOM(body);
}

function getToken(document) {
  return document;
}

function authenticate(noControl, password) {
  return axios
    .post("api", { noControl: noControl, password: password })
    .then(getBody)
    .then(parseHtml)
    .then(getToken);
}

module.exports = authenticate;
