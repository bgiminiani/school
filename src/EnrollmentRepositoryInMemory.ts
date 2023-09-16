import EnrollmentRepositoryInterface from "./EnrollmentRepositoryInterface";

export default class EnrollmentRepositoryInMemory
  implements EnrollmentRepositoryInterface
{
  enrollments: any[];

  constructor() {
    this.enrollments = [];
  }

  save(enrollment: any): void {
    this.enrollments.push(enrollment);
  }

  findByCpf(cpf: string): any {
    return this.enrollments.find(
      (enrollment) => enrollment.student.cpf.value === cpf
    );
  }

  findAllByClass(levelCode: string, moduleCode: string, classCode: string) {
    return this.enrollments.filter(
      (enrollment) =>
        enrollment.level === levelCode &&
        enrollment.module === moduleCode &&
        enrollment.grade === classCode
    );
  }

  count(): number {
    return this.enrollments.length;
  }
}
