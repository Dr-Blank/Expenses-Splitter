// Enums of client privileges
class Privilege {
  // Create new instances of the same class as static attributes
  static OWNER = new Privilege("Owner");
  static MANAGER = new Privilege("Manager");
  static PARTICIPANT = new Privilege("Participant");
  static NEW_CLIENT = new Privilege("New Client");

  constructor(name) {
    this.stringify = name;
  }
}

module.exports = Privilege;
