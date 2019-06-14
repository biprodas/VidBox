const lib = require('./lib');

test('My test test ', () => {
  
});

describe('ABSOLUTE', () => {
  it('should return a positive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  
  it('should return a negative number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  
  it('should return 0 number if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('GREET', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Biprodas');
    expect(result).toMatch(/Biprodas/);
  });
});

describe('GET CURRENCIES', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();
    const expected = ['BDT', 'USD', 'EUR'];
    expect(result).toEqual(expect.arrayContaining(expected));
  });
});

describe('GET PRODUCTS', () => {
  it('should return the product with the given id', () => {
    const result = lib.getProduct(1);
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty('id', 1);
  });
});


describe('REGISTER USER', () => {
  it('should throw if username is falsy', () => {
    // Null, undefined, NaN, '', 0, false
    const args = [ null, undefined, NaN, '', 0, false ];
    args.forEach(arg => {
      expect(() => { lib.registerUser(arg) }).toThrow();
    });
  });

  it('should return a user object if valid username is passed', () => {
    const result = lib.registerUser('Biprodas');
    expect(result).toMatchObject({ username: 'Biprodas' });
    expect(result.id).toBeGreaterThan(0);
  });
});

const db = require('./db');
const mail = require('./mail');

describe('APPLY DISCOUNT', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
    db.getCustomerSync = function(customerId){
      console.log('Fake reading customer...');
      return { id: customerId, points: 20};
    }

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe('NOTIFY CUSTOMER', () => {
  it('should send an email to the customer', () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'biprodas@gmail.com'})
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();

    //console.log(mail.send.mock.calls[0][1]);
    //expect(mail.send.mock.calls[0][0]).toBe('biprodas@gmail.com');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});