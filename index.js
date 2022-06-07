const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");

const teamMemberArr = [];

const init = () => {
  addEmployee();
};

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

const generateEmployeeCard = (employee) => {
  let roleContent;
  switch (employee.getRole()) {
    case "Manager":
      roleContent = `Office Number: ${employee.officeNumber()}`;
      break;
    case "Engineer":
      roleContent = `GitHub: <a href="https://github.com/${employee.getGithub()}" target="blank">${employee.getGithub()}</a>`;
      break;
    case "Intern":
      roleContent = `School Name: ${employee.getSchool()}`;
      break;
  }
  return `<div class="card text-white bg-danger mb-5 mr-4" style="max-width: 18rem">
    <div class="card-header">
    <h5>${employee.getName()}</h5>
    </div>
    <div class="card-body">
    <ul class="list-group">
    <li class="list-group-item bg-danger">${employee.getRole()}</li>
    <li class="list-group-item bg-danger">ID: ${employee.getId()}</li>
    <li class="list-group-item bg-danger">Email: ${employee.getEmail()}</li>
    <li class="list-group-item bg-danger">${roleContent}</li>
</ul>
</div>
</div>`;
};

const renderEmployeeCard = (teamMemberArr) => {
  const htmlCards = [];
  teamMemberArr.forEach((employee) => {
    htmlCards.push(generateEmployeeCard(employee));
  });
  return htmlCards.join("");
};

const generateHTML = (teamMemberArr) => {};

const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    err
      ? console.error(`Failed to create HTML file: ${err}`)
      : console.log("Successfully created your HTML File!");
  });
};

init();
