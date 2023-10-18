import Module from "./Module";
import ClassRoom from "./ClassRoom";
import Level from "./Level";
import Student from "./Student";
import EnrollmentCode from "./EnrollmentCode";
import Invoice from "./Invoice";

export default class Enrollment {
  student: Student;
  level: Level;
  module: Module;
  classRoom: ClassRoom;
  issueDate: Date;
  invoices: any []
  sequence: number;
  enrollmentCode: EnrollmentCode;

  constructor(
    student: Student,
    level: Level,
    module: Module,
    classRoom: ClassRoom,
    issueDate: Date,
    sequence: number,
  ) {
    if (student.getAge() < module.minimumAge) throw new Error("Student below minimum age");
    if (classRoom.isFinished(issueDate)) throw new Error("Class is already finished");
    if (classRoom.getPercentageCompleted() > 25) throw new Error("Class is already started");
    this.student = student;
    this.level = level;
    this.module = module;
    this.classRoom = classRoom;
    this.issueDate = issueDate;
    this.invoices = [];
    this.sequence = sequence;
    this.enrollmentCode = new EnrollmentCode(this.level.code, this.module.code, this.classRoom.code, issueDate, sequence);
  }

  generateInvoices(installments: number) {
    const installmentAmount = Math.trunc(this.module.price / installments * 100) / 100;
    for (let i = 1; i <= installments; i++) {
      this.invoices.push(new Invoice({
        month: i,
        year: this.issueDate.getFullYear(),
        amount: installmentAmount,
      }));
    }
    const total = this.invoices.reduce((total, invoice) => {
      total += invoice.amount;
      return  total;
    }, 0);
    const totalAmount = Math.trunc(total * 100) / 100
    const lastInstallmentAmount = Math.trunc((this.module.price - totalAmount + installmentAmount) * 100) / 100;
    this.invoices[this.invoices.length - 1].amount = lastInstallmentAmount;
  }
}
