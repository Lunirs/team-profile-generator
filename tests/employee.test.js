const Employee = require("../lib/employee");

describe("Employee", () => {
  it("should create a new employee object", () => {
    const newEmployee = new Employee();
    expect(typeof newEmployee).toEqual("object");
  });

  it("should be able to set a name value when passed in as a constructor argument", () => {
    const employeeName = "Daniel";
    const newEmployee = new Employee(employeeName);
    expect(newEmployee.name).toEqual(employeeName);
  });

  it("should be able to set a id value when passed in as a constructor argument", () => {
    const employeeId = "US111111";
    const newEmployee = new Employee(employeeId);
    expect(newEmployee.employeeId).toEqual(employeeId);
  });

  it("should be able to set an email value when passed in as a constructor argument", () => {
    const employeeEmail = "something@gmail.com";
    const newEmployee = new Employee(employeeEmail);
    expect(newEmployee.employeeEmail).toEqual(employeeEmail);
  });

  describe("getName", () => {
    it("should be able to retrieve the employee's name value from an employee object", () => {
      const nameVal = "Daniel";
      const newEmployee = new Employee(nameVal);

      expect(newEmployee.getName()).toEqual(nameVal);
    });
  });

  describe("getId", () => {
    it("should be able to retrieve the employee's id value from an employee object", () => {
      const idVal = "US111111";
      const newEmployee = new Employee("Daniel", idVal);

      expect(newEmployee.getID()).toEqual(idVal);
    });
  });

  describe("getEmail", () => {
    it("should be able to retrieve the employee's email value from an employee object", () => {
      const emailVal = "something@gmail.com";
      const newEmployee = new Employee("Daniel", "US111111", emailVal);

      expect(newEmployee.getEmail()).toEqual(emailVal);
    });
  });

  describe("getEmployeeTitle", () => {
    it("should be able to retrieve the job title of the employee", () => {
      const title = "Employee";
      const newEmployee = new Employee(
        "Daniel",
        "US111111",
        "something@gmail.com"
      );

      expect(newEmployee.getEmployeeTitle()).toEqual(title);
    });
  });
});
