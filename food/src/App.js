import {useState} from "react";

import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown , setCartShown ] = useState(false)

const showHandler = () =>{
  setCartShown(true)
}
const hideHandler = () =>{
  setCartShown(false)
}
  return (
    <CartProvider>
     { cartIsShown && <Cart onClose={hideHandler} />}
      <Header onShowCart={showHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
