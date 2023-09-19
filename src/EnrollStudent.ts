import Enrollment from "./Enrollment";
import EnrollmentRepositoryInterface from "./EnrollmentRepositoryInterface";
import GradeRepositoryInterface from "./GradeRepositoryInterface";
import LevelRepositoryInterface from "./LevelRepositoryInterface";
import ModuleRepositoryInterface from "./ModuleRepositoryInterface";
import Student from "./Student";

export default class EnrollStudent {
  levelRepository: LevelRepositoryInterface;
  moduleRepository: ModuleRepositoryInterface;
  gradeRepository: GradeRepositoryInterface;
  enrollmentRepository: EnrollmentRepositoryInterface;

  constructor(
    levelRepository: LevelRepositoryInterface,
    moduleRepository: ModuleRepositoryInterface,
    gradeRepository: GradeRepositoryInterface,
    enrollmentRepository: EnrollmentRepositoryInterface
  ) {
    this.levelRepository = levelRepository;
    this.moduleRepository = moduleRepository;
    this.gradeRepository = gradeRepository;
    this.enrollmentRepository = enrollmentRepository;
  }

  execute(enrollmentRequest: {
    student: { name: string; cpf: string; birthDate: string };
    level: string;
    module: string;
    grade: string;
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
    const grade = this.gradeRepository.findByCode(
      enrollmentRequest.level,
      enrollmentRequest.module,
      enrollmentRequest.grade
    );
    if (!grade) throw new Error("Grade not found");
    if (student.getAge() < module.minimumAge)
      throw new Error("Student below minimum age");
    const isDuplicatedStudent = this.enrollmentRepository.findByCpf(
      student.cpf.value
    );
    if (isDuplicatedStudent) throw new Error("Duplicated student");
    const studentsInClass = this.enrollmentRepository.findAllByClass(
      level.code,
      module.code,
      grade.code
    );
    if (
      studentsInClass &&
      studentsInClass.length > 0 &&
      studentsInClass.length >= grade.capacity
    )
      throw new Error("Class is over capacity");
    const enrollmentDate = new Date();
    const classEndDate = new Date(grade.end_date);
    const isAfterEndClass =
      enrollmentDate.getTime() - classEndDate.getTime() > 0;
    if (isAfterEndClass) throw new Error("Class is already finished");
    const classStartDate = new Date(grade.start_date);
    const classAlreadyStarted =
      enrollmentDate.getTime() - classStartDate.getTime() >
      (1 / 4) * (classEndDate.getTime() - classStartDate.getTime());
    if (classAlreadyStarted) throw new Error("Class is already started");
    const enrollmentQuantity = this.enrollmentRepository.count();
    const sequenceCode = (enrollmentQuantity + 1).toString().padStart(4, "0");
    const enrollmentCode = `${enrollmentDate.getFullYear()}${level.code}${
      module.code
    }${grade.code}${sequenceCode}`;
    const enrollment = new Enrollment(
      student,
      level.code,
      module.code,
      grade.code,
      sequenceCode
    );
    this.enrollmentRepository.save(enrollment);
    return enrollmentCode;
  }
}
