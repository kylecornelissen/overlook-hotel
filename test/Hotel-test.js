import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/classes/Hotel';

describe('Hotel', function() {
  let hotel, users, rooms;

  beforeEach(() => {
    users = ['user1','user2']
    rooms = ['room1','room2']
    hotel = new Hotel('test hotel', users, rooms);
  });

  it('should be a class of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should initialize with name', () => {
    expect(hotel.name).to.be.equal('test hotel');
  });
  
  it('should initialize with an array of users and rooms', () => {
    expect(hotel.users).to.deep.equal(['user1','user2']);
    expect(hotel.rooms).to.deep.equal(['room1','room2']);
  });
});
