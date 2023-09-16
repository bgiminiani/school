export default interface GradeRepositoryInterface {
  findByCode(levelCode: string, moduleCode: string, gradeCode: string): any;
}
