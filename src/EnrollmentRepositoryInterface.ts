import Enrollment from "./Enrollment";

export default interface EnrollmentRepositoryInterface {
  save(enrollment: Enrollment): void;
  findByCpf(cpf: string): Enrollment | undefined;
  findAllByClass(
    levelCode: string,
    moduleCode: string,
    classCode: string
  ): Enrollment[];
  count(): number;
}
