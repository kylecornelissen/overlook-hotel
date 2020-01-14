import chai from 'chai';
const expect = chai.expect;

import Room from '../src/classes/Room';

describe('Room', function() {
  let room;

  beforeEach(() => {
    room = new Room(1, 'suite', true, 'queen', 1, 300.28);
  });

  it('should be a class of Room', () => {
    expect(room).to.be.an.instanceOf(Room);
  });

  it('should initialize with room number', () => {
    expect(room.num).to.be.equal(1);
  });

  it('should initialize with room type', () => {
    expect(room.type).to.be.equal('suite');
  });

  it('should initialize with bidet boolean', () => {
    expect(room.bidet).to.be.equal(true);
  });

  it('should initialize with bed size', () => {
    expect(room.bedSize).to.be.equal('queen');
  });

  it('should initialize with number of beds', () => {
    expect(room.numBeds).to.be.equal(1);
  });
  
  it('should initialize with nightly room cost', () => {
    expect(room.cost).to.be.equal(300.28);
  });
});
