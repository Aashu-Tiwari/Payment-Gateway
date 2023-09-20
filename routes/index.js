var express = require('express');
var router = express.Router();
var Razorpay = require('Razorpay');

var instance = new Razorpay({
  key_id: 'rzp_test_su4golw5GKBuc4',
  key_secret: 'cArIBBesecLdvaBvkzh3xh12',
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create/orderId',(req,res)=>{
var options = {
  amount: 50000,  // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11"
};
instance.orders.create(options, function(err, order) {
  console.log(order);
  res.send(order)
});
})

router.post('/api/payment/verify',function(req,res){
  var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');
  console.log(req.body.response)
  var razorpayOrderId = req.body.response.razorpay_order_id;
  var razorpayPaymentId = req.body.response.razorpay_payment_id;
  var signature = req.body.response.razorpay_signature;
  var secret = 'cArIBBesecLdvaBvkzh3xh12';
  var status = validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
  console.log(status);
  res.send({signatureIsValid:status});
})

router.get('/success',(req,res)=>{
  res.render('success')
})

module.exports = router;
