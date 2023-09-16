import LevelRepositoryInterface from "./LevelRepositoryInterface";

export default class LevelRepositoryInMemory
  implements LevelRepositoryInterface
{
  levels: any[];

  constructor() {
    this.levels = [
      {
        code: "EF1",
        description: "Ensino Fundamental I",
      },
      {
        code: "EF2",
        description: "Ensino Fundamental II",
      },
      {
        code: "EM",
        description: "Ensino Médio",
      },
    ];
  }

  findByCode(code: string): any {
    return this.levels.find((level) => level.code === code);
  }
}
