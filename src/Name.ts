export default class Name {
  value: string;

  constructor(value: string) {
    if (!/^([A-Za-z]+ )+([A-Za-z])+$/.test(value)) throw Error("Invalid name");
    this.value = value;
  }
}
