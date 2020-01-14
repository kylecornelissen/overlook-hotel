class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.password = 'overlook2019';
    this.bookings;
  }
  verifyPassword(password) {
    return password === this.password;
  }
  findBookings(bookings) {
    this.bookings = bookings.filter(b => b.userID === this.id);
    return this.bookings
  }
}

export default User;
