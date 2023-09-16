import EnrollmentRepositoryInterface from "./EnrollmentRepositoryInterface";
import Student from "./Student";

type Enrollment = {
  student: Student;
  level: string;
  module: string;
  grade: string;
  code: string;
};

export default class EnrollStudent {
  levels = [
    {
      code: "EF1",
      description: "Ensino Fundamental I",
    },
    {
      code: "EF2",
      description: "Ensino Fundamental II",
    },
    {
      code: "EM",
      description: "Ensino Médio",
    },
  ];
  modules = [
    {
      level: "EF1",
      code: "1",
      description: "1o Ano",
      minimumAge: 6,
      price: 15000,
    },
    {
      level: "EF1",
      code: "2",
      description: "2o Ano",
      minimumAge: 7,
      price: 15000,
    },
    {
      level: "EF1",
      code: "3",
      description: "3o Ano",
      minimumAge: 8,
      price: 15000,
    },
    {
      level: "EF1",
      code: "4",
      description: "4o Ano",
      minimumAge: 9,
      price: 15000,
    },
    {
      level: "EF1",
      code: "5",
      description: "5o Ano",
      minimumAge: 10,
      price: 15000,
    },
    {
      level: "EF2",
      code: "6",
      description: "6o Ano",
      minimumAge: 11,
      price: 14000,
    },
    {
      level: "EF2",
      code: "7",
      description: "7o Ano",
      minimumAge: 12,
      price: 14000,
    },
    {
      level: "EF2",
      code: "8",
      description: "8o Ano",
      minimumAge: 13,
      price: 14000,
    },
    {
      level: "EF2",
      code: "9",
      description: "9o Ano",
      minimumAge: 14,
      price: 14000,
    },
    {
      level: "EM",
      code: "1",
      description: "1o Ano",
      minimumAge: 15,
      price: 17000,
    },
    {
      level: "EM",
      code: "2",
      description: "2o Ano",
      minimumAge: 16,
      price: 17000,
    },
    {
      level: "EM",
      code: "3",
      description: "3o Ano",
      minimumAge: 17,
      price: 17000,
    },
  ];
  grades = [
    {
      level: "EF",
      module: "1",
      code: "A",
      capacity: 10,
      start_date: "2021-06-01",
      end_date: "2021-12-15",
    },
    {
      level: "EM",
      module: "1",
      code: "A",
      capacity: 2,
      start_date: "2023-08-30",
      end_date: "2025-12-31",
    },
    {
      level: "EM",
      module: "3",
      code: "C",
      capacity: 5,
      start_date: "2023-05-01",
      end_date: "2023-09-12",
    },
  ];
  enrollmentRepository: EnrollmentRepositoryInterface;

  constructor(enrollmentRepository: EnrollmentRepositoryInterface) {
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
      enrollmentRequest.student.cpf
    );
    const level = this.levels.find(
      (level) => level.code === enrollmentRequest.level
    );
    if (!level) throw new Error("Level not found");
    const module = this.modules.find(
      (module) =>
        module.code === enrollmentRequest.module &&
        module.level === enrollmentRequest.level
    );
    if (!module) throw new Error("Module not found");
    const grade = this.grades.find(
      (grade) =>
        grade.code === enrollmentRequest.grade &&
        grade.module === enrollmentRequest.module &&
        grade.level === enrollmentRequest.level
    );
    if (!grade) throw new Error("Grade not found");
    const studentAge =
      new Date().getFullYear() -
      new Date(enrollmentRequest.student.birthDate).getFullYear();
    if (studentAge < module.minimumAge)
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
    if (studentsInClass.length > 0 && studentsInClass.length === grade.capacity)
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
    this.enrollmentRepository.save({
      student: student,
      level: level.code,
      module: module.code,
      grade: grade.code,
      code: enrollmentCode,
    });
    return enrollmentCode;
  }
}
