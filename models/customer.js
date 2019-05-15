const Joi = require('joi');
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Customer = mongoose.model('Customer', customerSchema);


function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(2).required(),
    phone: Joi.string().min(5).max(50),
    isGold: Joi.boolean()
  };
  return Joi.validate(customer, schema);
}

