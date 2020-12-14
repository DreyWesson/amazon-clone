import React from "react";
import CurrencyFormat from "react-currency-format";
import "./styles/Subtotal.css";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducers";
import { useHistory } from "react-router-dom";

export function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();
  console.log(basket);
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={(e) => history.push("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
}
