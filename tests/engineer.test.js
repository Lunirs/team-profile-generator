const Engineer = require("../lib/engineer");

describe("Engineer", () => {
  it("should be able to set a github account when passed in as a constructor argument", () => {
    const github = "Lunirs";
    const newEngineer = new Engineer(
      "Daniel",
      "US111111",
      "something@gmail.com",
      github
    );

    expect(newEngineer.github).toEqual(github);
  });

  describe("getGithub", () => {
    it("should be able to retrieve an engineer's github user name", () => {
      const githubUser = "Lunirs";
      const newEngineer = new Engineer(
        "Daniel",
        "US111111",
        "something@gmail.com",
        githubUser
      );

      expect(newEngineer.getGithub()).toEqual(githubUser);
    });
  });

  describe("getRole", () => {
    it("should be able to retrieve the job title of the employee", () => {
      const title = "Engineer";
      const newEngineer = new Engineer(
        "Daniel",
        "US111111",
        "something@gmail.com",
        "Lunirs"
      );

      expect(newEngineer.getRole()).toEqual(title);
    });
  });
});
