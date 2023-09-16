export default interface EnrollmentRepositoryInterface {
  save(enrollment: any): void;
  findByCpf(cpf: string): any;
  findAllByClass(levelCode: string, moduleCode: string, classCode: string): any;
  count(): number;
}
