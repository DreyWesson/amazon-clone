import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header, Home, Checkout, Login, Payment, Orders } from "./components";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ReactQueryDevtools } from "react-query-devtools";

const promise = loadStripe(
  "pk_test_51HfqwJHZ8LjXZi6Bdfy80HRdir4cHnuKM1oxO7aVplAmeWW6wByywVyK8zGSWbPaNwLqQ8vPluoSKrx830XcxLOR00QudVOZuT"
);

function App() {
  const [{ basket }, dispatch] = useStateValue();
  console.log(basket);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("USER is ....", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);
  return (
    <>
      <Router>
        <div className="app">
          <Switch>
            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>
            <Route path="/login">{<Login />}</Route>
            <Route path="/payment">
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </Route>
            <Route path="/orders">
              <Header />
              <Orders />
            </Route>
            {/* This is the default route */}
            <Route path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
