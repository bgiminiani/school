import Module from "./Module";
import ClassRoom from "./ClassRoom";
import Level from "./Level";
import Student from "./Student";

export default class Enrollment {
  student: Student;
  level: Level;
  module: Module;
  classRoom: ClassRoom;
  code: string;

  constructor(
    student: Student,
    level: Level,
    module: Module,
    classRoom: ClassRoom,
    code: string
  ) {
    if (student.getAge() < module.minimumAge) throw new Error("Student below minimum age");
    this.student = student;
    this.level = level;
    this.module = module;
    this.classRoom = classRoom;
    this.code = code;
  }
}
