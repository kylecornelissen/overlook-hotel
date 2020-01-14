// IMPORT FILES
import $ from 'jquery';
import './css/base.scss';
import './images/gerard-logo.png';
import './images/key.png';
import domUpdates from './domUpdates';
import Hotel from './classes/Hotel';
import User from './classes/User';
import Room from './classes/Room';
import Booking from './classes/Booking';

let page = $(document);

let hotel;
let users = [];
let rooms = [];
let bookings = [];
let username;

page.ready(findPage);
$('.login-btn').click(verifyLogin);
// $('.logout-btn').click(verifyLoginInfo); //redirect to login page and clear storage

function findPage() {
  if (page[0].title === 'Gerard Hotel') {fetchUsers()};
  if (page[0].title === 'Guest Page') {  domUpdates.insertGuestName() };
  // if (page[0].title === 'Manager Page') {console.log('manager')};
}

const fetchUsers = () => {
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
    .then(response => response.json())
    .then(data => createUsers(data.users))
}

const fetchRooms = () => {
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms")
    .then(response => response.json())
    .then(data => createRooms(data.rooms))
}

const fetchBookings = () => {
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings")
    .then(response => response.json())
    .then(data => createBookings(data.bookings))
}

const createUsers = (userData) => {
  userData.forEach(user => users.push(new User(user.id, user.name)));
}

const createRooms = (roomData) => {
  roomData.forEach(room => rooms.push(new Room(room.number, room.roomType,
                                               room.bidet, room.bedSize,
                                               room.numBeds, room.costPerNight)));
}

const createBookings = (bookingData) => {
  bookingData.forEach(booking => bookings.push(new Booking(booking.id, booking.userID,
                                               booking.date, booking.roomNumber,
                                               booking.roomServiceCharges)));
}

function verifyLogin() {
  event.preventDefault();
  username = $('.user-name-input').val();
  let password = $('.password-input').val();
  if (username.substr(0,5) !== 'guest' && username !== 'manager') {
    domUpdates.insertLoginError();
    return
  } else if (username === 'manager') {
    verifyPassword(password) ? loadManager(username) : domUpdates.insertPasswordError();
  } else {
    let guest = users.find(u => u.id === parseInt(username.substr(5,username.length-5)));
    (!guest) ? domUpdates.insertLoginError() : (verifyPassword(password) ? loadGuest(guest) : domUpdates.insertPasswordError());
  }
};

function verifyPassword(password) {
  return password === 'overlook2019';
}

function loadGuest(guest) {
  window.localStorage.setItem('guest', JSON.stringify(guest));
  window.location.href = "guest-dashboard.html";
}
