import Model from "../UI/Model";
import classes from "./Cart.module.css";
import CartContext from "../../store/Cart-Context";
import React , { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import LoadingIcons from 'react-loading-icons'

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://foodappbackend-60502-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart()
  };

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  console.log(cartCtx, "cart context");
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {" "}
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modelActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModelContent = <React.Fragment>
     {cartItems}
      <div className={classes.total}>
        <span>Total Amout</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckOut && modelActions}

  </React.Fragment>

  const isSubmittingModleContent =   <p style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '60vh'}}>
  <LoadingIcons.Circles />
    </p>

  const didSubmitModelContent = <React.Fragment>
      <p>Successfully Sent!</p>
      <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
     
    </div>
  </React.Fragment>   

  return (
    <Model onClose={props.onClose}>
       { !isSubmitting && !didSubmit && cartModelContent}
       { isSubmitting && isSubmittingModleContent}
       {!isSubmitting && didSubmit && didSubmitModelContent}
    </Model>
  );
};
export default Cart;
