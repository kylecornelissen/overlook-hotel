import $ from 'jquery';

const domUpdates = {
  insertLoginError() {
    $('#error-msg').css({'color': 'red', 'transition': '.8s ease'});
    $('#error-msg').empty().append('Username Does Not Exist.');
  },
  insertPasswordError() {
    $('#error-msg').css({'color': 'red', 'transition': '.8s ease'});
    $('#error-msg').empty().append('Password is Incorrect.');
  },
  insertGuestName(user) {
    let name = user.name.split(' ')[0];
    $('#welcome-heading').append(`Hello ${name}...`);
  },
  addBookings(user, bookings) {
    user.findBookings(bookings)
    $('#booking-list').empty();
    user.bookings.forEach(b => {
      $('#booking-list').append(`<li>Room ${b.roomNum} on ${b.date}</li>`)
    });
    if ($('#booking-list')[0].children.length === 0) this.addBookings(user,bookings);
  },
  addMoneySpent(user, rooms) {
    let totalCost = user.bookings.reduce((acc,b) => {
      acc += b.findTotalRoomCost(rooms);
      return acc
    }, 0);
    $('#total-spending').append(`Total Money Spent On Rooms: $${totalCost}`);
  }
}

export default domUpdates;
