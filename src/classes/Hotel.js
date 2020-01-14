import User from './User';
import Room from './Room';

class Hotel {
  constructor(name, users, rooms) {
    this.name = name;
    this.users = users;
    this.rooms = rooms;
  }
}

export default Hotel;
