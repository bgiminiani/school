export default class Invoice {
  month: number;
  year: number;
  amount: number;
  constructor({ month, year, amount }: { month: number, year: number, amount: number }) {
    this.month = month;
    this.year = year;
    this.amount = amount;
  }
}