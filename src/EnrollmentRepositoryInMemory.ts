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

  findByCode(code: string): Enrollment | undefined {
      const enrollment = this.enrollments.find(
        (enrollment) => enrollment.enrollmentCode.value === code
      );
      return enrollment;
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
    classCode: string
  ): Enrollment[] {
    const enrollmentsInClass = this.enrollments.filter(
      (enrollment) =>
        enrollment.level.code === levelCode &&
        enrollment.module.code === moduleCode &&
        enrollment.classRoom.code === classCode
    );
    return enrollmentsInClass;
  }

  count(): number {
    return this.enrollments.length;
  }
}
