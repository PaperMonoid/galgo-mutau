const axios = require("axios");
const jsdom = require("jsdom");
const R = require("ramda");
const { JSDOM } = jsdom;

function getBody(response) {
  return response.data;
}

function parseHtml(data) {
  return new JSDOM(data).window.document;
}

function clazz(text) {
  const [hours, classroom] = text.split("/");
  return {
    from: parseInt(hours.slice(0, 4)),
    to: parseInt(hours.slice(-4)),
    classroom: classroom
  };
}

function parseTeacher(span) {
  return new JSDOM(span).window.document.getElementsByTagName("span")[0]
    .innerHTML;
}

function parseGroup(array) {
  if (array == null) {
    return [];
  }
  if (array.length < 11) {
    return [];
  }
  const [
    key,
    name,
    credits,
    semester,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    teacher
  ] = array;
  const group = {
    key: key,
    name: name,
    credits: parseInt(credits.slice(0, -1)),
    semester: parseInt(semester.slice(0, 2)), // buggy
    monday: clazz(monday),
    tuesday: clazz(tuesday),
    wednesday: clazz(wednesday),
    thursday: clazz(thursday),
    friday: clazz(friday),
    saturday: clazz(saturday),
    teacher: parseTeacher(teacher)
  };
  return [group];
}

function parseGroups(document) {
  return Promise.resolve(document.getElementsByTagName("tr"))
    .then(R.tail)
    .then(R.map(e => e.querySelectorAll("font")))
    .then(R.map(Array.from))
    .then(R.map(R.map(R.prop("innerHTML"))))
    .then(R.chain(parseGroup));
}

function all(control, password) {
  return axios
    .get("http://201.174.121.12/cgi-bin/sie.pl", {
      params: {
        Opc: "LISTAG",
        dummy: 0,
        Control: control,
        Password: password
      }
    })
    .then(getBody)
    .then(parseHtml)
    .then(parseGroups);
}

module.exports = { all };
