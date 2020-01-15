import chai from 'chai';
const expect = chai.expect;

import Booking from '../src/classes/Booking';

describe('Booking', function() {
  let booking;
  let rooms;

  beforeEach(() => {
    rooms = [{num: 12, cost: 10}, {num: 33, cost: 1000}, {num: 42, cost: 333}];
    booking = new Booking('5fwr', 18, '2020/01/04', 12, [4, 8, 12]);
  });

  it('should be a class of Booking', () => {
    expect(booking).to.be.an.instanceOf(Booking);
  });

  it('should initialize with booking id', () => {
    expect(booking.id).to.be.equal('5fwr');
  });

  it('should initialize with userID', () => {
    expect(booking.userID).to.be.equal(18);
  });

  it('should initialize with date of booking', () => {
    expect(booking.date).to.be.equal('2020/01/04');
  });

  it('should initialize with roomNum', () => {
    expect(booking.roomNum).to.be.equal(12);
  });

  it('should initialize with array of room service charges', () => {
    expect(booking.roomServiceCharges).to.deep.equal([4,8,12]);
  });

  it('should have a method that finds total cost of room and room service charges', () => {
    expect(booking.findTotalRoomCost(rooms)).to.be.equal(10);
  });
});
