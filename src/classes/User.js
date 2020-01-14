class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.password = 'overlook2019';
  }
  verifyPassword(password) {
    return password === this.password;
  }
  findBookings(bookings) {
    return bookings.filter(b => b.userID === this.id);
  }
}

export default User;
