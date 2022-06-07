const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");

const teamMemberArr = [];

const addEmployee = () => {
  inquirer
    .prompt([
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
    ])
    .then(({ name, id, email, role }) => {
      let empParam = "";
      if (role === "Manager") {
        empParam = "Office Number";
      } else if (role === "Engineer") {
        empParam = "Github Username";
      } else if (role === "Intern") {
        empParam = "School's name";
      }

      inquirer
        .prompt([
          {
            type: "input",
            name: "roleContent",
            message: `Please input your team member's ${empParam}`,
          },
          {
            type: "list",
            name: "addMore",
            message: "Do you have more team members to add?",
            choices: ["Y", "N"],
          },
        ])
        .then(({ roleContent, addMore }) => {
          let newEmployee;
          if (role === "Manager") {
            newEmployee = new Manager(name, id, email, roleContent);
          } else if (role === "Engineer") {
            newEmployee = new Engineer(name, id, email, roleContent);
          } else if (role === "Intern") {
            newEmployee = new Intern(name, id, email, roleContent);
          }
          teamMemberArr.push(newEmployee);
          console.log(teamMemberArr);
          if (addMore === "Y") {
            addEmployee();
          } else {
            writeToFile("./dist/index.html", generateHTML(teamMemberArr));
          }
        });
    });
};

const generateEmployeeCard = (employee) => {};

const renderEmployeeCard = (teamMemberArr) => {};

const generateHTML = (teamMemberArr) => {};

const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    err
      ? console.error(`Failed to create HTML file: ${err}`)
      : console.log("Successfully created your HTML File!");
  });
};
