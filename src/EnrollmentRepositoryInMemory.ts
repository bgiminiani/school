import Enrollment from "./Enrollment";
import EnrollmentRepositoryInterface from "./EnrollmentRepositoryInterface";

export default class EnrollmentRepositoryInMemory
  implements EnrollmentRepositoryInterface
{
  enrollments: Enrollment[];

  constructor() {
    this.enrollments = [];
  }

  save(enrollment: any): void {
    this.enrollments.push(enrollment);
  }

  findByCpf(cpf: string): Enrollment | undefined {
    return this.enrollments.find(
      (enrollment) => enrollment.student.cpf.value === cpf
    );
  }

  findAllByClass(
    levelCode: string,
    moduleCode: string,
    classCode: string
  ): Enrollment[] {
    const enrollmentsInClass = this.enrollments.filter(
      (enrollment) =>
        enrollment.levelCode === levelCode &&
        enrollment.moduleCode === moduleCode &&
        enrollment.gradeCode === classCode
    );
    return enrollmentsInClass;
  }

  count(): number {
    return this.enrollments.length;
  }
}
