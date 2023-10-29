const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
  'sk_test_51O5zgSKMZHI0cJ8H7gA4Nr9BkdKgU4vYZRqVtJdIrAkOZxp8LROczK4EnqEZkfGC5OcisI56OnMezQGMqisfOVit006bC3f0Lu'
);

// router endpoints
router.post('/intents', async (req, res) => {
  try {
    // create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, // Integer,
      currency: 'vnd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    // Return the secret
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = router;
