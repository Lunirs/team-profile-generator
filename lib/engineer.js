// importing Employee Class
const Employee = require("./employee");

//add new Class of Engineer which extends from Employee Class.
// contains a constructor that passes in
//name id and email AND github username. Also contains other functions

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
// returns the github username value of this employee
  getGithub() {
    return this.github;
  }

  //returns the role value of the employee
  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
