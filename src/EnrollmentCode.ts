
export default class EnrollmentCode {
  value: string;
  constructor(
    levelCode: string,
    moduleCode: string,
    classRoomCode: string,
    date: Date,
    sequence: number,
  ) {
    const sequenceCode = (sequence).toString().padStart(4, "0");
    this.value = `${date.getFullYear()}${levelCode}${moduleCode}${classRoomCode}${sequenceCode}`;
  }
}