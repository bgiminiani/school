import EnrollmentRepositoryInMemory from "./EnrollmentRepositoryInMemory";
import EnrollStudent from "./EnrollStudent";
import ClassRoomRepositoryInMemory from "./ClassRoomRepositoryInMemory";
import LevelRepositoryInMemory from "./LevelRepositoryInMemory";
import ModuleRepositoryInMemory from "./ModuleRepositoryInMemory";

let enrollStudent: any;

beforeEach(() => {
  const levelRepository = new LevelRepositoryInMemory();
  const moduleRepository = new ModuleRepositoryInMemory();
  const classRommRepository = new ClassRoomRepositoryInMemory();
  const enrollmentRepository = new EnrollmentRepositoryInMemory();
  enrollStudent = new EnrollStudent(
    levelRepository,
    moduleRepository,
    classRommRepository,
    enrollmentRepository
  );
});
describe("Enroll Student", () => {
  it("Should not enroll without valid student name", () => {
    const enrollmentRequest = {
      student: {
        name: "Ana",
        cpf: "521.069.380-55",
        birthDate: "2002-03-12",
      },
      level: "EM",
      module: "1",
      classRoom: "A",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Invalid name")
    );
  });

  it("Should not enroll without valid student cpf", () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "111.111.111-11",
        birthDate: "2002-03-12",
      },
      level: "EM",
      module: "1",
      classRoom: "A",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Invalid cpf")
    );
  });

  it("Should not enroll duplicated student", () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Maria Silva",
        cpf: "088.085.642-40",
        birthDate: "2002-03-12",
      },
      level: "EM",
      module: "1",
      classRoom: "A",
      installments: 10
    };
    enrollStudent.execute(enrollmentRequest);
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Duplicated student")
    );
  });

  it("Should generate enrollment code", () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "157.465.478-08",
        birthDate: "2002-03-12",
      },
      level: "EM",
      module: "1",
      classRoom: "A",
      installments: 3,
    };
    const date = new Date();
    const fullYear = date.getFullYear();
    const enrollment = enrollStudent.execute(enrollmentRequest);
    expect(enrollment.enrollmentCode.value).toBe(`${fullYear}EM1A0001`);
  });

  it("Should not enroll if level does not exist", () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "157.465.478-08",
        birthDate: "2002-03-12",
      },
      level: "ES",
      module: "1",
      classRoom: "A",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Level not found")
    );
  });

  it("Should not enroll if module does not exist", () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "157.465.478-08",
        birthDate: "2002-03-12",
      },
      level: "EM",
      module: "10000",
      classRoom: "A",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Module not found")
    );
  });

  it("Should not enroll if classRoom does not exist", () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "157.465.478-08",
        birthDate: "2002-03-12",
      },
      level: "EM",
      module: "1",
      classRoom: "AA",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Classroom not found")
    );
  });

  it("Should not enroll student below minimum age", () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "157.465.478-08",
        birthDate: "2018-03-12",
      },
      level: "EM",
      module: "1",
      classRoom: "A",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Student below minimum age")
    );
  });

  it("Should not enroll student over class capacity", () => {
    enrollStudent.execute({
      student: {
        name: "Ana Maria",
        cpf: "157.465.478-08",
        birthDate: "2002-03-12",
      },
      level: "EM",
      module: "1",
      classRoom: "A",
      installments: 11,
    });
    enrollStudent.execute({
      student: {
        name: "Ana Maria",
        cpf: "468.829.164-70",
        birthDate: "2002-03-12",
      },
      level: "EM",
      module: "1",
      classRoom: "A",
      installments: 11,
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
        classRoom: "A",
        installments: 11,
      })
    ).toThrow(new Error("Class is over capacity"));
  });

  it("Should not enroll after que end of the class", () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "862.628.232-04",
        birthDate: "2005-03-12",
      },
      level: "EM",
      module: "3",
      classRoom: "C",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Class is already finished")
    );
  });

  it("Should not enroll after 25% of the start of the class", () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "233.948.962-81",
        birthDate: "2005-03-12",
      },
      level: "EM",
      module: "3",
      classRoom: "C",
    };
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
      new Error("Class is already finished")
    );
  });

  it("Should generate invoices", () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "233.948.962-81",
        birthDate: "2005-03-12",
      },
      level: "EM",
      module: "1",
      classRoom: "A",
      installments: 12,
    };
    const enrollment = enrollStudent.execute(enrollmentRequest)
    expect(enrollment.invoices).toHaveLength(12);
    expect(enrollment.invoices[0].amount).toBe(1416.66);
    expect(enrollment.invoices[11].amount).toBe(1416.74);
  });
});
