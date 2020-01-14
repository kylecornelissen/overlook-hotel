import chai from 'chai';
const expect = chai.expect;

import User from '../src/classes/User';

describe('User', function() {
  let user;

  beforeEach(() => {
    user = new User(1, 'test user name');
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
});
