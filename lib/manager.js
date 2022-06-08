// importing Employee Class
const Employee = require("./employee");

//add new Class of Manager which extends from Employee Class.
// contains a constructor that passes in
//name id and email AND office number. Also contains other functions
class Manager extends Employee {
  constructor(name, id, email, officeNum) {
    super(name, id, email);
    this.officeNum = officeNum;
  }

  // returns the office number value of the employee
  officeNumber() {
    return this.officeNum;
  }

  // returns the role of the employee
  getRole() {
    return "Manager";
  }
}

module.exports = Manager;
