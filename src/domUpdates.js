import $ from 'jquery';

const domUpdates = {
  insertLoginError() {
    $('#error-msg').empty().append('Username Does Not Exist.');
  },
  insertPasswordError() {
    $('#error-msg').empty().append('Password is Incorrect.');
  },
  insertGuestName() {
    console.log('hello');
    let name = JSON.parse(window.localStorage.getItem('guest')).name;
    $('#welcome-heading').append(`Hello ${name.split(' ')[0]}...`);
  }
  // addBookings(user) {
  //   console.log(user);
  // }
}

export default domUpdates;
