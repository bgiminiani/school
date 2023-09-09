import Cpf from "./Cpf";
import Name from "./Name";

const enrollmentStudents = [
  {
    name: "Angela Maria",
    cpf: "136.166.780-05",
  },
  {
    name: "Angela Rodrigues",
    cpf: "088.085.642-40",
  },
];

export default class EnrollStudent {
  execute({ name, cpf }: { name: string; cpf: string }): void {
    const studentName = new Name(name);
    const studentCpf = new Cpf(cpf);
    const duplicatedStudent = enrollmentStudents.find(
      (student) => student.cpf === studentCpf.value
    );
    if (duplicatedStudent) throw new Error("Duplicated student");
  }
}
