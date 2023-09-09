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
    const enrollmentQuantity = this.enrollment.length;
    const code = (enrollmentQuantity + 1).toString().padStart(4, "0");
    const date = new Date();
    const fullYear = date.getFullYear();
    const level = enrollmentRequest.level;
    const module = enrollmentRequest.module;
    const grade = enrollmentRequest.grade;
    const enrollmentCode = `${fullYear}${level}${module}${grade}${code}`;
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
