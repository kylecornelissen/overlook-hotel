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

let bookings = [];
let hotel;
let rooms = [];
let selectedDate;
let username;
let users = [];

page.ready(findPage);
$('.login-btn').click(verifyLogin);
$('.logout-btn').click(logoutUser);
$('.book-btn').click(domUpdates.addDateInput);
$('.choose-date-btn').click(requestDate);
$('.filter-room-btn').click(requestRoomType);
$('.cancel-btn').click(domUpdates.cancelForm);
$('.search-user-btn').click(searchUsers);
$('.user-search-results').click(deleteBooking);
$('.user-result').click(bookForUser);
$('.room-input-container').click(bookForUserPartTwo);

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

const bookThatRoom = (postData) => {
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", {
  	method: 'POST',
  	headers: {
  		'Content-Type': 'application/json'
  	},
  	body: JSON.stringify(postData),
  })
  	.then(response => response.json())
  	.then(json => console.log(json))
  	.catch(err => console.log(err));
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
  setTimeout(() => domUpdates.insertBookingHistory(currentUser, bookings), 1000);
  setTimeout(() => domUpdates.insertMoneySpent(currentUser, rooms), 1000);
}

function setupManagerDashboard() {
  let user = JSON.parse(window.localStorage.getItem('manager'));
  let currentUser = new User(user.id, user.name);
  fetchBookings();
  fetchRooms();
  domUpdates.insertGuestName(currentUser);
  setTimeout(() => domUpdates.insertAvailableRoomCount(bookings, today()), 1000);
  setTimeout(() => domUpdates.insertTotalRevenueToday(bookings, rooms, today()), 1000);
  setTimeout(() => domUpdates.insertOccupiedRoomsPercent(bookings, today()), 1000);
}

function requestDate() {
  selectedDate = $('.date-input').val().split('-').join('/');
  (selectedDate.length === 10) ? domUpdates.filterByDate(bookings, rooms, selectedDate) : domUpdates.insertDateError();
  global.bookItBtn.click(bookRoom);
}

function requestRoomType() {
  let roomType = $('input[name="room-filter"]:checked').val();
  roomType ? domUpdates.filterByRoomType(bookings, rooms, selectedDate, roomType) : domUpdates.insertFilterError();
  global.bookItBtn.click(bookRoom);
}

function bookRoom() {
  let user = JSON.parse(window.localStorage.getItem('guest'));
  let currentUser = new User(user.id, user.name);
  let postData = {"userID": currentUser.id, "date": selectedDate, "roomNumber": parseInt(event.target.id)};
  bookThatRoom(postData);
  domUpdates.cancelForm();
}

function searchUsers() {
  fetchUsers();
  let searchInputVal = $('.user-name-input').val();
  setTimeout(() => domUpdates.insertSearchResults(users, searchInputVal, bookings, rooms), 1000);
}

const deleteThatRoom = (deleteData) => {
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", {
  	method: 'DELETE',
  	headers: {
  		'Content-Type': 'application/json'
  	},
  	body: JSON.stringify(deleteData),
  })
  	.then(response => response.json())
  	.then(json => console.log(json))
  	.catch(err => console.log(err));
}

function bookForUser() {
  let userID = event.target.id;
  domUpdates.bookTheirRoom(userID);
}

function bookForUserPartTwo() {
  let userID = parseInt(event.target.id);
  let date = $('.date-input').val().split('-').join('/');
  let roomNum = parseInt($('.room-num-input').val());
  if (today() <= date) {
    bookThatRoom({"userID": userID, "date": date, "roomNumber": roomNum});
  };
}

function deleteBooking() {
  let info = event.target.id.split('-');
  let date = info[1];
  let id = info[0];
  console.log(date, id);
  if (today() <= date) {
    let deleteData = {"id": id};
    deleteThatRoom(deleteData);
  }
}
