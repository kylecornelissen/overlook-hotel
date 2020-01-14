class Booking {
  constructor(id, userID, date, roomNum, roomServiceCharges) {
    this.id = id;
    this.userID = userID;
    this.date = date;
    this.roomNum = roomNum;
    this.roomServiceCharges = roomServiceCharges;
  }
  findTotalRoomServiceCost() {
    if (this.roomServiceCharges === []) return 0
    return this.roomServiceCharges.reduce((acc,charge) => {
      acc += charge;
      return acc
    }, 0)
  }
  findTotalRoomCost(rooms) {
    return rooms.find(r => {
      return r.num === this.roomNum
    }).cost + this.findTotalRoomServiceCost();
  }
}

export default Booking;
