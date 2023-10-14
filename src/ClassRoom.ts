export default class ClassRoom {
  level: string;
  module: string;
  code: string;
  capacity: number;
  start_date: string;
  end_date: string;

  constructor({
    level,
    module,
    code,
    capacity,
    start_date,
    end_date,
  }: {
    level: string,
    module: string,
    code: string,
    capacity: number,
    start_date: string,
    end_date: string,
  }) {
    this.level = level;
    this.module = module;
    this.code = code;
    this.capacity = capacity;
    this.start_date = start_date;
    this.end_date = end_date;
  }
}