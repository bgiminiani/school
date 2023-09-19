import Student from "./Student";

export default class Enrollment {
  student: Student;
  levelCode: string;
  moduleCode: string;
  gradeCode: string;
  code: string;

  constructor(
    student: Student,
    levelCode: string,
    moduleCode: string,
    gradeCode: string,
    code: string
  ) {
    this.student = student;
    this.levelCode = levelCode;
    this.moduleCode = moduleCode;
    this.gradeCode = gradeCode;
    this.code = code;
  }
}
