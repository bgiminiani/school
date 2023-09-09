import Cpf from "./Cpf";
import Name from "./Name";

type Enrollment = {
  name: string;
  cpf: string;
};

const enrollment: Enrollment[] = [
  {
    name: "Angela Maria",
    cpf: "136.166.780-05",
  },
];

export default class EnrollStudent {
  execute(enrollmentRequest: { student: { name: string; cpf: string } }): void {
    const studentName = new Name(enrollmentRequest.student.name);
    const studentCpf = new Cpf(enrollmentRequest.student.cpf);
    const duplicatedStudent = enrollment.find(
      (student) => student.cpf === studentCpf.value
    );
    if (duplicatedStudent) throw new Error("Duplicated student");
    enrollment.push({
      name: studentName.value,
      cpf: studentCpf.value,
    });
  }
}
