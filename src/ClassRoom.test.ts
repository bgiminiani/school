import ClassRoom from "./ClassRoom"

describe('ClassRoom entity', () => {
  it('Should verify if capacity is over classroom', () => {
    const classRoom = new ClassRoom({
      level: "EM",
      module: "1",
      code: "A",
      capacity: 2,
      start_date: "2023-08-30",
      end_date: "2025-12-31",
    });
    const enrollmentStudents = 3;
    expect(classRoom.isOverCapacity(enrollmentStudents)).toBeTruthy();
  });
})