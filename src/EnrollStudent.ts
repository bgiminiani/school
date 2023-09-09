import Student from "./Student";

type Enrollment = {
  student: Student;
  level: string;
  module: string;
  grade: string;
  code: string;
};

export default class EnrollStudent {
  enrollment: Enrollment[] = [];
  levels = [
    {
      code: "EF1",
      description: "Ensino Fundamental I",
    },
    {
      code: "EF2",
      description: "Ensino Fundamental II",
    },
    {
      code: "EM",
      description: "Ensino Médio",
    },
  ];
  modules = [
    {
      level: "EF1",
      code: "1",
      description: "1o Ano",
      minimumAge: 6,
      price: 15000,
    },
    {
      level: "EF1",
      code: "2",
      description: "2o Ano",
      minimumAge: 7,
      price: 15000,
    },
    {
      level: "EF1",
      code: "3",
      description: "3o Ano",
      minimumAge: 8,
      price: 15000,
    },
    {
      level: "EF1",
      code: "4",
      description: "4o Ano",
      minimumAge: 9,
      price: 15000,
    },
    {
      level: "EF1",
      code: "5",
      description: "5o Ano",
      minimumAge: 10,
      price: 15000,
    },
    {
      level: "EF2",
      code: "6",
      description: "6o Ano",
      minimumAge: 11,
      price: 14000,
    },
    {
      level: "EF2",
      code: "7",
      description: "7o Ano",
      minimumAge: 12,
      price: 14000,
    },
    {
      level: "EF2",
      code: "8",
      description: "8o Ano",
      minimumAge: 13,
      price: 14000,
    },
    {
      level: "EF2",
      code: "9",
      description: "9o Ano",
      minimumAge: 14,
      price: 14000,
    },
    {
      level: "EM",
      code: "1",
      description: "1o Ano",
      minimumAge: 15,
      price: 17000,
    },
    {
      level: "EM",
      code: "2",
      description: "2o Ano",
      minimumAge: 16,
      price: 17000,
    },
    {
      level: "EM",
      code: "3",
      description: "3o Ano",
      minimumAge: 17,
      price: 17000,
    },
  ];
  grades = [
    {
      level: "EF",
      module: "1",
      code: "A",
      capacity: 10,
    },
    {
      level: "EM",
      module: "1",
      code: "A",
      capacity: 10,
    },
  ];

  constructor() {}

  execute(enrollmentRequest: {
    student: { name: string; cpf: string };
    level: string;
    module: string;
    grade: string;
  }): any {
    const student = new Student(
      enrollmentRequest.student.name,
      enrollmentRequest.student.cpf
    );
    const existingStudent = this.enrollment.find(
      (enrollmentStudent) =>
        enrollmentStudent.student.cpf.value === student.cpf.value
    );
    if (existingStudent) throw new Error("Duplicated student");
    const level = this.levels.find(
      (level) => level.code === enrollmentRequest.level
    );
    if (!level) throw new Error("Level not found");
    const module = this.modules.find(
      (module) =>
        module.code === enrollmentRequest.module &&
        module.level === enrollmentRequest.level
    );
    if (!module) throw new Error("Module not found");
    const grade = this.grades.find(
      (grade) =>
        grade.code === enrollmentRequest.grade &&
        grade.module === enrollmentRequest.module &&
        grade.level === enrollmentRequest.level
    );
    if (!grade) throw new Error("Grade not found");
    const enrollmentQuantity = this.enrollment.length;
    const code = (enrollmentQuantity + 1).toString().padStart(4, "0");
    const enrollmentDate = new Date();
    const enrollmentCode = `${enrollmentDate.getFullYear()}${level.code}${
      module.code
    }${grade.code}${code}`;
    this.enrollment.push({
      student: student,
      level: enrollmentRequest.level,
      module: enrollmentRequest.module,
      grade: enrollmentRequest.grade,
      code: enrollmentCode,
    });
    return enrollmentCode;
  }
}
