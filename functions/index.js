const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HfqwJHZ8LjXZi6BuDw5TNHA06JejoRoeUqdO7AFlyZRqdpzZeOdzaxLzIfaZhRBFdWVJ0jPByxJc34UlBYMK5w400o4hCw6rU"
);

// API Set-up
// App config
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// API route
app.get("/", (req, res) => res.status(200).send("Hello world"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment request received >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // OK - Created
  res.status(201).send({ clientSecret: paymentIntent.client_secret });
});

// Listen command
exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/fir-1425e/us-central1/api
