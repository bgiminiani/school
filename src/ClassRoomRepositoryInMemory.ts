export default class ClassRoomRepositoryInMemory {
  classRooms: any[];

  constructor() {
    this.classRooms = [
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
  }
  findByCode(levelCode: string, moduleCode: string, classRoomCode: string) {
    return this.classRooms.find(
      (classRoom) =>
        classRoom.level === levelCode &&
        classRoom.module === moduleCode &&
        classRoom.code === classRoomCode
    );
  }
}
