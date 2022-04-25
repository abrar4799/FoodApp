import Model from "../UI/Model";
import classes from "./Cart.module.css";
import CartContext from "../../store/Cart-Context";
import { useContext ,useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";



const Cart = (props) => {
  const [isCheckOut , setIsCheckOut ] = useState(false)
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id =>{
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem(item)
  };

  const orderHandler = () =>{
     setIsCheckOut(true)
  }
 
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  console.log(cartCtx , 'cart context')
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {" "}
      {cartCtx.items.map((item) => (
        <CartItem key={item.id}
                  name={item.name}
                  amount={item.amount}
                  price={item.price}
                  onRemove={cartItemRemoveHandler.bind(null , item.id)}
                  onAdd={cartItemAddHandler.bind(null , item)}/>
      ))}
    </ul>
  );

  const modelActions =  <div className={classes.actions}>
  <button className={classes["button--alt"]} onClick={props.onClose}>
    Close
  </button>
{hasItems &&  <button className={classes.button} onClick={orderHandler}>Order</button>}
</div>
  
  return (
    <Model onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amout</span>
        <span>{totalAmount}</span>
      </div>
   {  isCheckOut &&    <Checkout  onCancel = {props.onClose}/>}
   {!isCheckOut && modelActions}
     
    </Model>
  );
};
export default Cart;
