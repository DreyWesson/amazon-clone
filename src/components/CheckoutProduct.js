import React from "react";
import { useStateValue } from "../StateProvider";
import "./styles/CheckoutProduct.css";
import { v4 as uuidv4 } from "uuid";

export function CheckoutProduct({
  id,
  title,
  image,
  price,
  rating,
  hideButton,
}) {
  const [{ basket }, dispatch] = useStateValue();
  console.log(basket);
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_) => (
              <span role="img" aria-label="ratings" key={uuidv4()}>
                🌟
              </span>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from basket</button>
        )}
      </div>
    </div>
  );
}
