import ClassRoom from "./ClassRoom";

export default interface ClassRoomRepositoryInterface {
  findByCode(levelCode: string, moduleCode: string, gradeCode: string): ClassRoom | undefined;
}
