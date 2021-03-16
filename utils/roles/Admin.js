import User from "./User";

export default class Admin extends User {
  constructor(options) {   
    super(options);
    this.isAdmin = true;
  };
}