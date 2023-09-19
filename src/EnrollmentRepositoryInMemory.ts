import Enrollment from "./Enrollment";
import EnrollmentRepositoryInterface from "./EnrollmentRepositoryInterface";

export default class EnrollmentRepositoryInMemory implements EnrollmentRepositoryInterface {
  enrollments: Enrollment[];

  constructor() {
    this.enrollments = [];
  }

  save(enrollment: Enrollment): void {
    this.enrollments.push(enrollment);
  }

  findByCpf(cpf: string): Enrollment | undefined {
    const enrollment = this.enrollments.find(
      (enrollment) => enrollment.student.cpf.value === cpf
    );
    return enrollment;
  }

  findAllByClass(
    levelCode: string,
    moduleCode: string,
    gradeCode: string
  ): Enrollment[] {
    const enrollments = this.enrollments.filter(
      (enrollment) =>
        enrollment.levelCode === levelCode &&
        enrollment.moduleCode === moduleCode &&
        enrollment.gradeCode === gradeCode
    );
    return enrollments;
  }

  count(): number {
    return this.enrollments.length;
  }
}
