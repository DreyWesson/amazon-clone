import React from "react";
import { useStateValue } from "../StateProvider";
import { CheckoutProduct, Subtotal } from "./index";
import "./styles/Checkout.css";
import { v4 as uuidv4 } from "uuid";

export function Checkout() {
  const [{ basket, user }] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        {basket?.length === 0 ? (
          <div>
            <h3>{user?.email}</h3>
            <h2>Your Shopping Basket is empty</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
              odio repellendus nulla quo, adipisci earum voluptate quas
              similique, saepe distinctio obcaecati voluptas, natus consectetur
              aliquam.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="checkout__title">Your Shopping Basket</h2>
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
        )}
      </div>
      {basket?.length > 0 && (
        <div className="checkout__right">
          <h1>Subtotal</h1>
          <Subtotal />
        </div>
      )}
    </div>
  );
}
