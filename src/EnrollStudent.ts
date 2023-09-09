import Cpf from "./Cpf";

export default class EnrollStudent {
  execute({ name, cpf }: { name: string; cpf: string }): void {
    if (!/^([A-Za-z]+ )+([A-Za-z])+$/.test(name))
      throw new Error("Invalid name");
    const student = {
      name,
      cpf: new Cpf(cpf),
    };
  }
}
