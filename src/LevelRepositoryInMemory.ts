import Level from "./Level";
import LevelRepositoryInterface from "./LevelRepositoryInterface";

export default class LevelRepositoryInMemory
  implements LevelRepositoryInterface
{
  levels: Level[];

  constructor() {
    this.levels = [
      new Level({
        code: "EF1",
        description: "Ensino Fundamental I",
      }),
      new Level({
        code: "EF2",
        description: "Ensino Fundamental II",
      }),
      new Level({
        code: "EM",
        description: "Ensino Médio",
      }),
    ];
  }

  findByCode(code: string): any {
    return this.levels.find((level) => level.code === code);
  }
}
