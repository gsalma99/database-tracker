const inquirer = require("inquirer");
const questions = [
  { type: "input", message: "something in", name: "first" },
  {
    type: "list",
    message: "please choose one",
    name: "second",
    choices: ["first string", "second string", "third string"],
  },
  { name: "third", message: "tell me a joke", type: "input" },
];

const menuquestion = {
  type: "list",
  message: "please choose what you want to view.",
  name: "answer",
  choices: [
    "departments",
    "roles",
    "employees",
    "add a department",
    "add a role",
    "add a employee",
    "update an employee role",
  ],
};

inquirer.prompt(menuquestion).then((answers) => {
  console.log(answers);
});
