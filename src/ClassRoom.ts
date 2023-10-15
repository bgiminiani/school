export default class ClassRoom {
  level: string;
  module: string;
  code: string;
  capacity: number;
  startDate: Date;
  endDate: Date;

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
    this.startDate = new Date(start_date);
    this.endDate = new Date(end_date);
  }

  isOverCapacity(studentEnrollments: number) {
    return studentEnrollments >= this.capacity;
  }

  isFinished(): boolean {
    const today = new Date();
    return today.getTime() - this.endDate.getTime() > 0;
  }

  isStarted(): boolean {
    const today = new Date();
    return today.getTime() > this.startDate.getTime();
  }

  getPercentageCompleted(): number {
    const today = new Date();
    const percentual =  (today.getTime() - this.startDate.getTime()) / (this.endDate.getTime() - this.startDate.getTime()) * 100;
    return Math.round(percentual*100) / 100;
  }

}