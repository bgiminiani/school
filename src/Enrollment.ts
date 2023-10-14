import Student from "./Student";

export default class Enrollment {
  student: Student;
  levelCode: string;
  moduleCode: string;
  classRoomCode: string;
  code: string;

  constructor(
    student: Student,
    levelCode: string,
    moduleCode: string,
    classRoomCode: string,
    code: string
  ) {
    this.student = student;
    this.levelCode = levelCode;
    this.moduleCode = moduleCode;
    this.classRoomCode = classRoomCode;
    this.code = code;
  }
}
