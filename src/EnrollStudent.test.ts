import EnrollStudent from "./EnrollStudent";

describe("Enroll Student", () => {
  it("Should not enroll without valid student name", () => {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
      student: {
        name: "Ana",
        cpf: "521.069.380-55",
      },
      level: "EM",
      module: "1",
      grade: "A",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Invalid name")
    );
  });

  it("Should not enroll without valid student cpf", () => {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "111.111.111-11",
      },
      level: "EM",
      module: "1",
      grade: "A",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Invalid cpf")
    );
  });

  it("Should not enroll duplicated student", () => {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
      student: {
        name: "Ana Maria Silva",
        cpf: "088.085.642-40",
      },
      level: "EM",
      module: "1",
      grade: "A",
    };
    enrollStudent.execute(enrollmentRequest);
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Duplicated student")
    );
  });

  it("Should generate enrollment code", () => {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "157.465.478-08",
      },
      level: "EM",
      module: "1",
      grade: "A",
    };
    const date = new Date();
    const fullYear = date.getFullYear();
    const enrollmentCode = enrollStudent.execute(enrollmentRequest);
    expect(enrollmentCode).toBe(`${fullYear}EM1A0001`);
  });
});
