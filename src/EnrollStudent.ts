import Cpf from "./Cpf";
import Name from "./Name";
import Student from "./Student";

type Enrollment = {
  name: string;
  cpf: string;
};

export default class EnrollStudent {
  enrollment: Enrollment[] = [];

  constructor() {
    this.enrollment = [
      {
        name: "Angela Maria",
        cpf: "136.166.780-05",
      },
    ];
  }

  execute(enrollmentRequest: { student: { name: string; cpf: string } }): void {
    const student = new Student(
      enrollmentRequest.student.name,
      enrollmentRequest.student.cpf
    );
    const existingStudent = this.enrollment.find(
      (enrollmentStudent) => enrollmentStudent.cpf === student.cpf.value
    );
    if (existingStudent) throw new Error("Duplicated student");
    this.enrollment.push({
      name: student.name.value,
      cpf: student.cpf.value,
    });
  }
}
