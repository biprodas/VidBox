// Testing numbers
module.exports.absolute = function(number) {
  return number >= 0 ? number : -number;
}

// Testing String
module.exports.greet = function(name){
  return 'Welcome ' + name;
}

// Testing Arrays
module.exports.getCurrencies = function(){
  return ['USD', 'BDT', 'EUR'];
}

// Testing Objects
module.exports.getProduct = function(id){
  return { id: 1, price: 10 }
}

// Testing Exceptions
module.exports.registerUser = function(username){
  if(!username) throw new Error('Username is required');
  return { id: 1, username }
}


const db = require('./db');
const mail = require('./mail');

// Mock functions
module.exports.applyDiscount = function(order) {
  const customer = db.getCustomerSync(order.customerId);
  if((customer.points > 10)) order.totalPrice *= 0.9;
}

// Mock functions
module.exports.notifyCustomer = function(order){
  const customer = db.getCustomerSync(order.customerId);
  mail.send(customer.mail, 'Your order was placed successfully.');
}