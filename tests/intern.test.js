const Intern = require("../lib/intern");

describe("Intern", () => {
  it("should be able to set a school name when passed in as a constructor argument", () => {
    const school = "UIUC";
    const newIntern = new Intern(
      "Daniel",
      "US111111",
      "something@gmail.com",
      school
    );

    expect(newIntern.school).toEqual(school);
  });

  describe("getSchoolName", () => {
    it("should be able to retrieve an Intern's school name", () => {
      const school = "UIUC";
      const newIntern = new Intern(
        "Daniel",
        "US111111",
        "something@gmail.com",
        school
      );

      expect(newEngineer.getSchoolName()).toEqual(school);
    });
  });

  describe("getEmployeeTitle", () => {
    it("should be able to retrieve the job title of the employee", () => {
      const title = "Intern";
      const newIntern = new Intern(
        "Daniel",
        "US111111",
        "something@gmail.com",
        "UIUC"
      );

      expect(newIntern.getEmployeeTitle()).toEqual(title);
    });
  });
});
