export default class Subscription {
  private user: string;

  constructor(user: string) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
}
