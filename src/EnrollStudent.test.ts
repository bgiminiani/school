import EnrollStudent from "./EnrollStudent";

describe("Enroll Student", () => {
  it("Should not enroll without valid student name", () => {
    const enrollStudent = new EnrollStudent();
    expect(() =>
      enrollStudent.execute({
        name: "Ana",
        cpf: "521.069.380-55",
      })
    ).toThrow(new Error("Invalid name"));
  });

  it("Should not enroll without valid student cpf", () => {
    const enrollStudent = new EnrollStudent();
    expect(() =>
      enrollStudent.execute({
        name: "Ana Maria",
        cpf: "111.111.111-11",
      })
    ).toThrow(new Error("Invalid cpf"));
  });

  it("Should enroll student", () => {
    const enrollStudent = new EnrollStudent();
    expect(() =>
      enrollStudent.execute({
        name: "Ana Maria",
        cpf: "521.069.380-55",
      })
    ).not.toThrow(new Error("Invalid name"));
  });
});
