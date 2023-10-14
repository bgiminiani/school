import Level from "./Level";

export default interface LevelRepositoryInterface {
  findByCode(code: string): Level | undefined;
}
