import EnrollmentRepositoryInterface from "./EnrollmentRepositoryInterface";

export default class GetEnrollment {
  enrollmentRepository: EnrollmentRepositoryInterface;

  constructor(enrollmentRepository: EnrollmentRepositoryInterface) {
    this.enrollmentRepository = enrollmentRepository;
  }

  execute(code: string): any {
    const enrollment = this.enrollmentRepository.findByCode(code);
    return enrollment;
  }
}