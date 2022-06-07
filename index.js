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
  return `
        <div class="card text-white bg-danger mb-5 mr-4 col-sm-1 col-md-4 col-lg-4" style="max-width: 18rem">
          <div class="card-header">
            <h2>${employee.getName()}</h2>
          </div>
          <div class="card-body">
            <ul class="list-group">
              <li class="list-group-item bg-danger param">${employee.getRole()}</li>
              <li class="list-group-item bg-danger param">ID: ${employee.getId()}</li>
              <li class="list-group-item bg-danger param">Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
              <li class="list-group-item bg-danger param">${roleContent}</li>
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

const generateHTML = (teamMemberArr) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Team Profile Generator! | Quick access to your employee info</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
      integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn"
      crossorigin="anonymous"/>
    <link rel="stylesheet" href="../assets/css/styles.css" />
  </head>
  <body class="bg-dark">
    <header>
      <div class="jumbotron jumbotron-fluid bg-danger text-white">
        <div class="container">
          <h1 class="display-4 text-center">My Team!</h1>
          <p class="lead text-center">
            Readily displays your team information.
          </p>
        </div>
      </div>
    </header>
    <main class="container row m-auto d-flex justify-content-around align-items-center">
            ${renderEmployeeCard(teamMemberArr)}
    </main>
  </body>
</html>
`;
};

const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    err
      ? console.error(`Failed to create HTML file: ${err}`)
      : console.log("Successfully created your HTML File!");
  });
};

init();
