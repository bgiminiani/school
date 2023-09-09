import Cpf from "./Cpf";
import Name from "./Name";

type EnrollmentStudent = {
  name: string;
  cpf: string;
};

const enrollmentStudents: EnrollmentStudent[] = [
  {
    name: "Angela Maria",
    cpf: "136.166.780-05",
  },
];

export default class EnrollStudent {
  execute(enrollmentRequest: { student: { name: string; cpf: string } }): void {
    const studentName = new Name(enrollmentRequest.student.name);
    const studentCpf = new Cpf(enrollmentRequest.student.cpf);
    const duplicatedStudent = enrollmentStudents.find(
      (student) => student.cpf === studentCpf.value
    );
    if (duplicatedStudent) throw new Error("Duplicated student");
    enrollmentStudents.push({
      name: studentName.value,
      cpf: studentCpf.value,
    });
  }
}
