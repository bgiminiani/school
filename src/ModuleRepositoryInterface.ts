import Module from "./Module";

export default interface ModuleRepositoryInterface {
  findByCode(levelCode: string, moduleCode: string): Module | undefined;
}
