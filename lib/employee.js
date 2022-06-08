//add new Class of employee which contains a constructor that passes in
//name id and email. Also contains other functions
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
// returns the name value of the employee
  getName() {
    return this.name;
  }
//returns the id value of the employee
  getId() {
    return this.id;
  }
//returns the email value of the employee
  getEmail() {
    return this.email;
  }
//returns the Role value of the employee
  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
