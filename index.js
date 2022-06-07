const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");

const addEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Please enter your team member's name",
    },
    {
      type: "list",
      name: "role",
      message: "What job title does this team member have?",
      choices: ["Manager", "Engineer", "Intern"],
    },
    {
      type: "input",
      name: "id",
      message: "Please input your team member's id number",
    },
    {
      type: "input",
      name: "email",
      message: "Please input your team member's email address",
    },
  ]);
};
