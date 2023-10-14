export default interface ClassRoomRepositoryInterface {
  findByCode(levelCode: string, moduleCode: string, gradeCode: string): any;
}
