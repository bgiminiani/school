import EnrollStudent from "./EnrollStudent";

describe("Enroll Student", () => {
  it("Should not enroll without valid student name", () => {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
      student: {
        name: "Ana",
        cpf: "521.069.380-55",
        birthDate: "2002-03-12",
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
        birthDate: "2002-03-12",
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
        birthDate: "2002-03-12",
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
        birthDate: "2002-03-12",
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

  it("Should not enroll if level does not exist", () => {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "157.465.478-08",
        birthDate: "2002-03-12",
      },
      level: "ES",
      module: "1",
      grade: "A",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Level not found")
    );
  });

  it("Should not enroll if module does not exist", () => {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "157.465.478-08",
        birthDate: "2002-03-12",
      },
      level: "EM",
      module: "10000",
      grade: "A",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Module not found")
    );
  });

  it("Should not enroll if grade does not exist", () => {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "157.465.478-08",
        birthDate: "2002-03-12",
      },
      level: "EM",
      module: "1",
      grade: "AA",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Grade not found")
    );
  });

  it("Should not enroll student below minimum age", () => {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "157.465.478-08",
        birthDate: "2018-03-12",
      },
      level: "EM",
      module: "1",
      grade: "A",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Student below minimum age")
    );
  });
  
  it("Should not enroll student over class capacity", () => {
    const enrollStudent = new EnrollStudent();
    enrollStudent.execute({
      student: {
        name: "Ana Maria",
        cpf: "157.465.478-08",
        birthDate: "2002-03-12",
      },
      level: "EM",
      module: "1",
      grade: "A",
    });
    enrollStudent.execute({
      student: {
        name: "Ana Maria",
        cpf: "468.829.164-70",
        birthDate: "2002-03-12",
      },
      level: "EM",
      module: "1",
      grade: "A",
    });
    expect(() =>
      enrollStudent.execute({
        student: {
          name: "Ana Maria",
          cpf: "767.676.866-70",
          birthDate: "2002-03-12",
        },
        level: "EM",
        module: "1",
        grade: "A",
      })
    ).toThrow(new Error("Class is over capacity"));
  });

  it("Should not enroll after que end of the class", () => {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "862.628.232-04",
        birthDate: "2005-03-12",
      },
      level: "EM",
      module: "3",
      grade: "C",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Class is already finished")
    );
  });
});
