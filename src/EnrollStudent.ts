import Enrollment from "./Enrollment";
import EnrollmentRepositoryInterface from "./EnrollmentRepositoryInterface";
import ClassRoomRepositoryInterface from "./ClassRoomRepositoryInterface";
import LevelRepositoryInterface from "./LevelRepositoryInterface";
import ModuleRepositoryInterface from "./ModuleRepositoryInterface";
import Student from "./Student";

export default class EnrollStudent {
  levelRepository: LevelRepositoryInterface;
  moduleRepository: ModuleRepositoryInterface;
  classRoomRepository: ClassRoomRepositoryInterface;
  enrollmentRepository: EnrollmentRepositoryInterface;

  constructor(
    levelRepository: LevelRepositoryInterface,
    moduleRepository: ModuleRepositoryInterface,
    classRoomRepository: ClassRoomRepositoryInterface,
    enrollmentRepository: EnrollmentRepositoryInterface
  ) {
    this.levelRepository = levelRepository;
    this.moduleRepository = moduleRepository;
    this.classRoomRepository = classRoomRepository;
    this.enrollmentRepository = enrollmentRepository;
  }

  execute(enrollmentRequest: {
    student: { name: string; cpf: string; birthDate: string };
    level: string;
    module: string;
    classRoom: string;
    installments: number;
    value: number;
  }): any {
    const student = new Student(
      enrollmentRequest.student.name,
      enrollmentRequest.student.cpf,
      enrollmentRequest.student.birthDate
    );
    const level = this.levelRepository.findByCode(enrollmentRequest.level);
    if (!level) throw new Error("Level not found");
    const module = this.moduleRepository.findByCode(
      enrollmentRequest.level,
      enrollmentRequest.module
    );
    if (!module) throw new Error("Module not found");
    const classRoom = this.classRoomRepository.findByCode(
      enrollmentRequest.level,
      enrollmentRequest.module,
      enrollmentRequest.classRoom
    );
    if (!classRoom) throw new Error("Classroom not found");
    const isDuplicatedStudent = this.enrollmentRepository.findByCpf(
      student.cpf.value
    );
    if (isDuplicatedStudent) throw new Error("Duplicated student");
    const studentsInClass = this.enrollmentRepository.findAllByClass(
      level.code,
      module.code,
      classRoom.code
    );
    if (classRoom.isOverCapacity(studentsInClass?.length))
      throw new Error("Class is over capacity");

    const enrollmentSequence = this.enrollmentRepository.count() + 1;
    const enrollment = new Enrollment(
      student,
      level,
      module,
      classRoom,
      new Date,
      enrollmentSequence,
    );
    const installmentAmount = Math.trunc(module.price / enrollmentRequest.installments * 100) / 100;
    for (let i = 1; i <= enrollmentRequest.installments; i++) {
      enrollment.invoices.push({
        amount: installmentAmount,
      });
    }
    const total = enrollment.invoices.reduce((total, invoice) => {
      total += invoice.amount;
      return  total;
    }, 0);
    const totalAmount = Math.trunc(total * 100) / 100
    const lastInstallmentAmount = Math.trunc((module.price - totalAmount + installmentAmount) * 100) / 100;
    enrollment.invoices[enrollment.invoices.length - 1].amount = lastInstallmentAmount;
    this.enrollmentRepository.save(enrollment);
    return enrollment;
  }
}
