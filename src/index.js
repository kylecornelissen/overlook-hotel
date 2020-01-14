// IMPORT FILES
import $ from 'jquery';
import './css/base.scss';
import './images/old-gerard.jpg'
import Hotel from './classes/Hotel'
import User from './classes/User'
import Room from './classes/Room'
import Booking from './classes/Booking'

let hotel;
let users = [];
let rooms = [];
let bookings = [];

$(document).ready(createHotel);
$('.login-btn').click(getLoginInfo);

function createHotel() {
  fetchUsers();
  fetchRooms();
  fetchBookings();
  hotel = new Hotel('Gerard Hotel', users, rooms);
  console.log(hotel, bookings);
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

function getLoginInfo() {

};
