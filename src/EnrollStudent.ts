export default class EnrollStudent {
  execute(name: string): void {
    if (!/^([A-Za-z]+ )+([A-Za-z])+$/.test(name))
      throw new Error("Invalid student name");
  }
}
