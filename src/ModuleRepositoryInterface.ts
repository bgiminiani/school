export default interface ModuleRepositoryInterface {
  findByCode(levelCode: string, moduleCode: string): any;
}
