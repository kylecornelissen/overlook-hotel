class Booking {
  constructor(id, userID, date, roomNum, roomServiceCharges) {
    this.id = id;
    this.userID = userID;
    this.date = date;
    this.roomNum = roomNum;
    this.roomServiceCharges = roomServiceCharges;
  }
  findTotalRoomCost(rooms) {
    return rooms.find(r => {
      return parseInt(r.num) === parseInt(this.roomNum)
    }).cost;
  }
}

export default Booking;
