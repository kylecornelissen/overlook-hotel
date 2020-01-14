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
$('.logout-btn').click(logoutUser);

function findPage() {
  if (page[0].title === 'Gerard Hotel') fetchUsers();
  if (page[0].title === 'Guest Dashboard') setupGuestDashboard();
  if (page[0].title === 'Mr. Manager') setupManagerDashboard();
}

const today = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = String(date.getMonth()+1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`
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
  username = $('.user-name-input').val();
  let password = $('.password-input').val();
  if (username.substr(0,5) !== 'guest' && username !== 'manager') {
    domUpdates.insertLoginError();
    return
  } else if (username === 'manager') {
    let manager = new User(0, 'Mr.Manager');
    manager.verifyPassword(password) ? loadUser(manager, 'manager') : domUpdates.insertPasswordError();
  } else {
    let guest = users.find(user => user.id === parseInt(username.substr(5,username.length-5)));
    (!guest) ? domUpdates.insertLoginError() : (guest.verifyPassword(password) ? loadUser(guest, 'guest') : domUpdates.insertPasswordError());
  }
};

function verifyPassword(password) {
  return password === 'overlook2019';
}

function loadUser(user, userType) {
  window.localStorage.setItem(`${userType}`, JSON.stringify(user));
  window.location.href = `${userType}-dashboard.html`;
}

function logoutUser() {
  window.localStorage.clear();
  window.location.href = "index.html";
}

function setupGuestDashboard() {
  let user = JSON.parse(window.localStorage.getItem('guest'));
  let currentUser = new User(user.id, user.name);
  fetchBookings();
  fetchRooms();
  domUpdates.insertGuestName(currentUser);
  setTimeout(() => domUpdates.addBookings(currentUser, bookings), 1000);
  setTimeout(() => domUpdates.addMoneySpent(currentUser, rooms), 1000);
}

function setupManagerDashboard() {
  let user = JSON.parse(window.localStorage.getItem('manager'));
  let currentUser = new User(user.id, user.name);
  fetchBookings();
  fetchRooms();
  domUpdates.insertGuestName(currentUser);
  setTimeout(() => domUpdates.addAvailableRooms(bookings, today()), 1000);
  setTimeout(() => domUpdates.addTotalRevenueToday(bookings, rooms, today()), 1000);
  setTimeout(() => domUpdates.addOccupiedRoomsPercent(bookings, today()), 1000);
}
