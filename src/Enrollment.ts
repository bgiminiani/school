import Module from "./Module";
import ClassRoom from "./ClassRoom";
import Level from "./Level";
import Student from "./Student";
import EnrollmentCode from "./EnrollmentCode";

export default class Enrollment {
  student: Student;
  level: Level;
  module: Module;
  classRoom: ClassRoom;
  issueDate: Date;
  sequence: number;
  enrollmentCode: EnrollmentCode;

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
    this.issueDate = issueDate;
    this.sequence = sequence;
    this.enrollmentCode = new EnrollmentCode(this.level.code, this.module.code, this.classRoom.code, issueDate, sequence);
  }
}
