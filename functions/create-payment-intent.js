// domain/.netlify/functions/create-payment-intent
require("dotenv").config();

const stripe = require("stripe")(
  "sk_test_51OPTCfEuIQhGRAuumoWy2sO4Co5wLdAVasSueHy0oUDYwARipEfjaVQqAlrTwqb0NmRvYSfOAcqpLgW5DgGBHYCW00WH9UWPnL"
);
const items = [
  { id: 1, name: "john" },
  { id: 2, name: "susan" },
];
exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
    const calculateOrderAmount = () => {
      return shipping_fee + total_amount;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: "Create Payment Intent",
  };
};
