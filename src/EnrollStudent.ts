import Cpf from "./Cpf";
import Name from "./Name";

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
    const studentName = new Name(enrollmentRequest.student.name);
    const studentCpf = new Cpf(enrollmentRequest.student.cpf);
    const duplicatedStudent = this.enrollment.find(
      (student) => student.cpf === studentCpf.value
    );
    if (duplicatedStudent) throw new Error("Duplicated student");
    this.enrollment.push({
      name: studentName.value,
      cpf: studentCpf.value,
    });
  }
}
