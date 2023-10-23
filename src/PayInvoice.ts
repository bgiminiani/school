import EnrollmentRepositoryInterface from "./EnrollmentRepositoryInterface";
import Invoice from "./Invoice";

export default class PayInvoice {
  enrollmentRepository: EnrollmentRepositoryInterface;

  constructor(enrollmentRepository: EnrollmentRepositoryInterface) {
    this.enrollmentRepository = enrollmentRepository;
  }

  execute(enrollmentCode: string, issueDate: Date): Invoice {
    const enrollment = this.enrollmentRepository.findByCode(enrollmentCode);
    if (!enrollment) throw new Error('Enrollment not found');
    const actualInvoice = enrollment.getActualInvoice(issueDate);
    actualInvoice.pay();
    return actualInvoice;
  }
}