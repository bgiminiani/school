import ClassRoomRepositoryInMemory from "./ClassRoomRepositoryInMemory";
import EnrollmentRepositoryInMemory from "./EnrollmentRepositoryInMemory";
import EnrollStudent from "./EnrollStudent";
import LevelRepositoryInMemory from "./LevelRepositoryInMemory";
import ModuleRepositoryInMemory from "./ModuleRepositoryInMemory";
import PayInvoice from "./PayInvoice";

let payInvoice: any;
let enrollStudent: any;

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
  payInvoice = new PayInvoice(enrollmentRepository);
});

describe('Pay Invoice', () => {
  it('Should pay enrollment invoice', () => {
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
    const enrollment = enrollStudent.execute(enrollmentRequest);
    const invoice = payInvoice.execute(enrollment.enrollmentCode.value, new Date());
  })
})
