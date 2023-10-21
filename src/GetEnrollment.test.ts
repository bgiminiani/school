import EnrollmentRepositoryInMemory from "./EnrollmentRepositoryInMemory";
import EnrollStudent from "./EnrollStudent";
import ClassRoomRepositoryInMemory from "./ClassRoomRepositoryInMemory";
import LevelRepositoryInMemory from "./LevelRepositoryInMemory";
import ModuleRepositoryInMemory from "./ModuleRepositoryInMemory";
import GetEnrollment from "./GetEnrollment";

let enrollStudent: any;
let getEnrollment: any;

beforeEach(() => {
  const levelRepository = new LevelRepositoryInMemory();
  const moduleRepository = new ModuleRepositoryInMemory();
  const classRommRepository = new ClassRoomRepositoryInMemory();
  const enrollmentRepository = new EnrollmentRepositoryInMemory();
  enrollStudent = new EnrollStudent(
    levelRepository,
    moduleRepository,
    classRommRepository,
    enrollmentRepository
  );
  getEnrollment = new GetEnrollment(enrollmentRepository);
});
describe("Get Enrollment Student", () => {
  it("Should get enrollment by code with invoice balance", () => {
    const enrollmentRequest = {
      student: {
        name: "Ana Maria",
        cpf: "233.948.962-81",
        birthDate: "2005-03-12",
      },
      level: "EM",
      module: "1",
      classRoom: "A",
      installments: 12,
    };
    const getEnrollmentRequest = {
      code: '2023EM1A0001',
    };
    enrollStudent.execute(enrollmentRequest);
    const enrollment = getEnrollment.execute(getEnrollmentRequest.code);
    expect(enrollment.enrollmentCode.value).toBe(getEnrollmentRequest.code);
  });
});