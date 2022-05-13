var Razorpay = require('razorpay')
var instance = new Razorpay({
    key_id: 'rzp_test_NJqv2KzKXLDjaZ',
    key_secret: 'j3TdhutkUp8kO9pbnwYdOZWl',
  });
  console.log('connected')
  module.exports = instance;