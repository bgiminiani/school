import Module from "./Module";
import ClassRoom from "./ClassRoom";
import Level from "./Level";
import Student from "./Student";

export default class Enrollment {
  student: Student;
  level: Level;
  module: Module;
  classRoom: ClassRoom;
  sequence: number;
  code: string;

  constructor(
    student: Student,
    level: Level,
    module: Module,
    classRoom: ClassRoom,
    issueDate: Date,
    sequence: number,
  ) {
    if (student.getAge() < module.minimumAge) throw new Error("Student below minimum age");
    this.student = student;
    this.level = level;
    this.module = module;
    this.classRoom = classRoom;
    this.sequence = sequence;
    const sequenceCode = (this.sequence).toString().padStart(4, "0");
    const enrollmentCode = `${issueDate.getFullYear()}${this.level.code}${this.module.code}${this.classRoom.code}${sequenceCode}`;
    this.code = enrollmentCode;
  }
}
