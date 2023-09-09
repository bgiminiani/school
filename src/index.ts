import EnrollStudent from "./EnrollStudent";

const enrollStudent = new EnrollStudent();
console.log(
  `User: ${enrollStudent.execute({
    name: "ana",
    cpf: "111-111-111-46",
  })}`
);
