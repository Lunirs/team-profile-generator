// importing Employee Class
const Employee = require("./employee");

//add new Class of Intern which extends from Employee Class.
// contains a constructor that passes in
//name id and email AND school name. Also contains other functions
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  //returns the school name value of the employee
  getSchool() {
    return this.school;
  }

  // returns the role of the employee
  getRole() {
    return "Intern";
  }
}

module.exports = Intern;
