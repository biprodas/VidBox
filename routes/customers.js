const express = require('express');
const { Customer, validate } = require('../models/customer');

const router = express.Router();

// get all the customers
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

// create a new customer
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(404).send(error.details[0].message);

  let customer = new Customer({ 
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  customer = await customer.save();

  res.send(customer);
});

// get a customer by id
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if(!customer) return res.status(404).send('The customer with the given ID was not found');
  res.send(customer);
});

// update a customer by id
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(404).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  }, { new: true })

  if(!customer) return res.status(404).send('The customer with the given ID was not found');

  res.send(customer);
});

// delete a customer by id
router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if(!customer) return res.status(404).send('The customer with the given ID was not found');
  res.send(customer);
})


module.exports = router;