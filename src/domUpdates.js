import $ from 'jquery';

const domUpdates = {
  insertLoginError() {
    $('.login-error').css({'color': 'red', 'transition': '.8s ease'});
    $('.login-error').empty().append('Username Does Not Exist.');
  },
  insertPasswordError() {
    $('.login-error').css({'color': 'red', 'transition': '.8s ease'});
    $('.login-error').empty().append('Password is Incorrect.');
  },
  insertDateError() {
    $('.date-error').css({'color': 'red', 'transition': '.8s ease'});
    $('.date-error').empty().append('Please Enter A Date.');
  },
  insertFilterError() {
    $('.filter-error').css({'color': 'red', 'transition': '.8s ease'});
    $('.filter-error').empty().append('Choose A Filter or Select a Room.');
  },
  insertGuestName(user) {
    let name = user.name.split(' ')[0];
    $('#welcome-heading').append(`Hello ${name}...`);
  },
  insertBookingHistory(user, bookings) {
    user.findBookings(bookings);
    $('#booking-list').empty();
    user.bookings.forEach(b => {
      let addSpace = (String(b.roomNum).length === 1) ? `\xa0` : '';
      $('#booking-list').append(`<li>Room ${addSpace}${b.roomNum} on ${b.date}</li>`)
    });
    $('.user-info').css({'height': '100%'});
    if ($('#booking-list')[0].children.length === 0) this.insertBookingHistory(user,bookings);
  },
  insertMoneySpent(user, rooms) {
    let totalCost = user.bookings.reduce((acc,b) => {
      acc += b.findTotalRoomCost(rooms);
      return acc
    }, 0);
    $('#total-spending').append(`Total Spent: $${totalCost.toFixed(2)}`);
  },
  insertAvailableRoomCount(bookings, today) {
    let occupiedRooms = this.findOccupiedRooms(bookings, today);
    $('#rooms-open').empty();
    $('#rooms-open').append(`Rooms Available Today: ${25 - Array.from(new Set(occupiedRooms)).length}`);
  },
  insertTotalRevenueToday(bookings, rooms, today) {
    let totalRevenue = bookings.reduce((acc,b) => {
      if (b.date === today) acc += b.findTotalRoomCost(rooms);
      return acc
    }, 0);
    $('#total-rev-today').empty();
    $('#total-rev-today').append(`Total Revenue Today: $${totalRevenue.toFixed(2)}`);
  },
  insertOccupiedRoomsPercent(bookings, today) {
    let occupiedRooms = this.findOccupiedRooms(bookings, today);
    $('#pct-rooms').empty();
    $('#pct-rooms').append(`Rooms Occupied: ${Math.round((Array.from(new Set(occupiedRooms)).length / 25)*100)}%`);
  },
  findOccupiedRooms(bookings, today) {
    return bookings.filter(b => {
      return b.date === today
    }).map(b => b.roomNum);
  },
  findOpenRooms(bookings, date) {
    let openRooms = [...Array(25).keys()];
    bookings.filter(b => {
      return b.date === date
    }).map(b => parseInt(b.roomNum))
    .forEach(r => {
      openRooms.includes(r) && openRooms.splice(openRooms.indexOf(r),1);
    });
    return openRooms
  },
  addDateInput() {
    $('.book-form').css({'display': 'flex'});
    $('.book-btn').css({'display': 'none'});
    $('.stats').css({'display': 'none'});
  },
  filterByDate(bookings, rooms, date, typeFilter) {
    if (!typeFilter) $('.radio-btns').css({'display': 'flex'});
    $('.date-form').css({'display': 'none'});
    $('.open-rooms').css({'display': 'flex'});
    rooms = rooms.filter(r => this.findOpenRooms(bookings, date).includes(r.num));
    this.insertOpenRooms(rooms);
  },
  filterByRoomType(bookings, rooms, date, roomType) {
    $('.radio-btns').css({'display': 'none'});
    rooms = rooms.filter(r => r.type === roomType);
    this.filterByDate(bookings, rooms, date, true);
  },
  insertOpenRooms(rooms) {
    $('.open-rooms-list').empty();
    if (rooms.length > 0) {
      rooms.forEach(r => {
        $('.open-rooms-list').append(
          `<li>
            <h3>Room #${r.num} ($${r.cost.toFixed(2)})</h3>
            <p>Type: ${r.type.toUpperCase()}<br>
            Beds: ${r.numBeds}<br>
            Size: ${r.bedSize.toUpperCase()}<br>
            Bidet? ${(r.bidet ? 'YES' : 'NO')}</p>
            <button id="${r.num}" class="book-form-btn book-this-room-btn" type="button" name="button">Book Room #${r.num}</button>
          </li>`
        );
      });
      global.bookItBtn = $('.book-this-room-btn');
    } else {
      $('.book-form').css({'display': 'none'});
      $('#welcome-heading').after(
        `<h2 class="form-direction apology-msg">Our Sincerest Apologies!
        There Are No Rooms Available That Day That Match The Criteria.</h3>`
      );
      $('.go-back-btn').css({'display': 'inline'});
    };
  },
  cancelForm() {
    $('.apology-msg').remove();
    $('.book-btn').css({'display': 'inline'});
    $('.stats').css({'display': 'inline'});
    $('.date-form').css({'display': 'flex'});
    $('.book-form').css({'display': 'none'});
    $('.radio-btns').css({'display': 'none'});
    $('.open-rooms').css({'display': 'none'});
    $('.go-back-btn').css({'display': 'none'});
  },
  insertSearchResults(users, searchVal, bookings, rooms) {
    $('.user-search-results').empty();
    let sum = 0;
    let searchResults = users.filter(u => {
      return u.name.toLowerCase().includes(searchVal.toLowerCase());
    });
    if (searchResults.length !== 0) {
      bookings.forEach(b => {
        if (b.userID === searchResults[0].id) {
          $('.user-search-results').append(
            `<li>Room #${b.roomNum} on ${b.date}</li>
            <button id="${b.id}-${b.date}" class="delete-booking-btn" type="button" name="button">DELETE</button>`
          );
          global.deleteBookBtn = $('.delete-booking-btn');
          sum += b.findTotalRoomCost(rooms);
        };
      });
      $('.user-result').prepend(
        `<h3>${searchResults[0].name} ($${sum} spent)</h3>
        <button id=${searchResults[0].id} class="book-for-user-btn" type="button" name="button">Book Room For ${searchResults[0].name}</button>`
      );
      global.bookForUserBtn = $('.book-for-user-btn');
    } else {
      $('.user-search-results').append(
        `<p>Sorry. No results were found...</p>`
      );
    }
    $('.user-info').css({'height': '100%'});
  },
  bookTheirRoom(userID) {
    $('.book-their-room').css({'display': 'inline'});
    $('.room-input-container').css({'display': 'inline'});
    $('.room-input-container').append(
      `<button id="${userID}" class="choose-date-room-btn book-form-btn selection-btn" type="button" name="button">Continue</button>`
    )
    global.chooseDateRoomBtn = $('.choose-date-room-btn');
  }
}

export default domUpdates;
