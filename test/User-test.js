import chai from 'chai';
const expect = chai.expect;

import User from '../src/classes/User';

describe('User', function() {
  let user;
  let bookings;

  beforeEach(() => {
    user = new User(1, 'test user name');
    bookings = [{userID: 33},{userID: 1},{userID: 42},{userID: 1}];
  });

  it('should be a class of User', () => {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should initialize with id and name', () => {
    expect(user.id).to.be.equal(1);
    expect(user.name).to.be.equal('test user name');
  });

  it('should initialize with password', () => {
    expect(user.password).to.be.equal('overlook2019');
  });

  it('should have a function that verifies password and returns boolean', () => {
    expect(user.verifyPassword('overlook2019')).to.be.equal(true);
    expect(user.verifyPassword('wRoNg_PaSsWoRd')).to.be.equal(false);
  });

  it('should have a function that returns their bookings by ID', () => {
    expect(user.findBookings(bookings)).to.deep.equal([{userID: 1},{userID: 1}]);
  });
});
