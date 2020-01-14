import $ from 'jquery';

const domUpdates = {
  insertLoginError() {
    $('#error-msg').empty().append('Username Does Not Exist.');
  },
  insertPasswordError() {
    $('#error-msg').empty().append('Password is Incorrect.');
  },
  insertGuestName(user) {
    let name = user.name.split(' ')[0];
    $('#welcome-heading').append(`Hello ${name}...`);
  },
  addBookings(user, bookings) {
    user.findBookings(bookings).forEach(b => {;
      $('#booking-list').append(
        `<li>Room ${b.roomNum} on ${b.date}</li>`
      )
    });
  }
}

export default domUpdates;
