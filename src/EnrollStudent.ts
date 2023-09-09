import Cpf from "./Cpf";
import Name from "./Name";

export default class EnrollStudent {
  execute({ name, cpf }: { name: string; cpf: string }): void {
    new Name(name);
    new Cpf(cpf);
  }
}
