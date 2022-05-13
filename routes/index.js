var express = require('express');
var router = express.Router();
var instance = require('../razorpay/r')
var crypto=require('crypto');
const async = require('hbs/lib/async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/amt',function( req,res){
  console.log(req.body.amount)
   let amount=req.body.amount;
   var options = {
    amount: amount*100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  //console.log(options)
  instance.orders.create(options, function(err, order) {
      if(err){
        console.log(err)
      }else{
        console.log(order)
        res.render('pay',{order})
      }
    
  });
})
router.post('/verify', async function(req,res){
  var data = req.body;
  const order_id=data['response[razorpay_order_id]'];
  const payment_id=data['response[razorpay_payment_id]'];
  const razorpay_signature=data['response[razorpay_signature]'];
  const key_secret = 'j3TdhutkUp8kO9pbnwYdOZWl';
  let hmac = crypto.createHmac('sha256', key_secret);
  await hmac.update(order_id + "|" + payment_id);
  const generated_signature = hmac.digest('hex');
  if(razorpay_signature===generated_signature){
   console.log('succes')
}
else
console.log('succes')
})
module.exports = router;

