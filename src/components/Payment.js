import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import { CheckoutProduct } from "./index";
import { getBasketTotal } from "../reducers";
import { useStateValue } from "../StateProvider";
import { getClientSecret } from "../axios";
import "./styles/Payment.css";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "react-query";

export function Payment() {
  const [{ basket, user }, dispatch] = useStateValue(),
    stripe = useStripe(),
    elements = useElements();

  const [succeeded, setSucceeded] = useState(false),
    [processing, setProcessing] = useState(""),
    [error, setError] = useState(null),
    [disabled, setDisabled] = useState(true),
    [clientSecret, setClientSecret] = useState(true);
  const history = useHistory();
  const [basketTotal, setBasketTotal] = useState(getBasketTotal(basket) * 100);

  // useQuery implementation
  const { data, status } = useQuery(
    ["getClientSecret", basketTotal],
    getClientSecret,
    { staleTime: 5 * 60 * 60 }
  );
  console.log(data);
  useEffect(() => setClientSecret(data?.data.clientSecret), [data]);

  // useEffect(() => {
  //   const getClientSecret = async () => {
  //     const response = await axios({
  //       method: "post",
  //       // Stripes expect the total in subunit
  //       url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
  //     });
  //     console.log(response);
  //     setClientSecret(response.data.clientSecret);
  //   };
  //   getClientSecret();
  // }, [basket]);

  console.log("THE SECRET IS >>> ", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length}</Link> items)
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <pre>{user?.email}</pre>
            <pre>123 React Lane</pre>
            <pre>Los Angeles, CA</pre>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                key={uuidv4()}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
