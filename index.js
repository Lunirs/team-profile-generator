// Importing in Classes
const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");

// empty team member array

const teamMemberArr = [];

// function to initialize once the index.js file is run.
// Will start the prompt

const init = () => {
  addEmployee();
};

//function that contains the prompts.

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
    // Once the top portion is completed, depending on the role of the current
    //employee, it will go through an if statement and generate tne next questions.
    .then(({ name, id, email, role }) => {
      let empParam = "";
      if (role === "Manager") {
        empParam = "Office Number";
      } else if (role === "Engineer") {
        empParam = "Github Username";
      } else if (role === "Intern") {
        empParam = "School's name";
      }

     // questions based on what role was chosen and to ask if they want to add more
     //team members 
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
        //Take the inputs and add them to speficit constructor of the class
        .then(({ roleContent, addMore }) => {
          let newEmployee;
          if (role === "Manager") {
            newEmployee = new Manager(name, id, email, roleContent);
          } else if (role === "Engineer") {
            newEmployee = new Engineer(name, id, email, roleContent);
          } else if (role === "Intern") {
            newEmployee = new Intern(name, id, email, roleContent);
          }
          // push the result to the team member array defined up top.
          teamMemberArr.push(newEmployee);
          console.log(teamMemberArr);
          // if the user pressed Y to add more, initiate the inquirer prompt agian.
          if (addMore === "Y") {
            addEmployee();
            // if the user pressed N to add more, finish and generate the html
          } else {
            writeToFile("./dist/index.html", generateHTML(teamMemberArr));
          }
        });
    });
};

// function to generate the card of the employee depending on their role.
// utilizes switch case statement to add the correct content to the HTML page.
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
            <h3>${employee.getRole()}</h3>
          </div>
          <div class="card-body">
            <ul class="list-group">
              <li class="list-group-item bg-danger param">ID: ${employee.getId()}</li>
              <li class="list-group-item bg-danger param">Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
              <li class="list-group-item bg-danger param">${roleContent}</li>
            </ul>
          </div>
        </div>`;
};

// function to add the generated cards into an array that would hold the cards.
//then join them to create the entire card section which will be used in generate HTML
const renderEmployeeCard = (teamMemberArr) => {
  const htmlCards = [];
  teamMemberArr.forEach((employee) => {
    htmlCards.push(generateEmployeeCard(employee));
  });
  return htmlCards.join("");
};

//takes the joined HTML cards and appends it to the card container "main"
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

// function to create a file with the user input results.

const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    err
      ? console.error(`Failed to create HTML file: ${err}`)
      : console.log("Successfully created your HTML File!");
  });
};


// starts up the inquirer prompt upon being run
init();
