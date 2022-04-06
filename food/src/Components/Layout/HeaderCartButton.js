import { useContext , useEffect , useState} from 'react'
import CartContext from '../../store/Cart-Context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
const HeaderCartButton = props =>{
  const [BtnIsHeighleted , setBtnIsHeighleted] = useState(false)
  const cartCtx = useContext(CartContext)
  const {items } = cartCtx
  const numbersOfCartItems =  items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  console.log(cartCtx , 'cartCtx')

  
  const btnClasses = `${classes.button} ${ BtnIsHeighleted ? classes.bump : ''}`

  useEffect(()=>{

    if(items.length === 0){
      return;
    }
    setBtnIsHeighleted(true)
    const timer =  setTimeout( () =>{
      setBtnIsHeighleted(false)
    } , 300)
    return () => {
      clearTimeout(timer);
    };

  },[items])

  
  return (
  <button className={btnClasses} onClick={props.onClick}>
      {console.log(props , "from button") }
      <span className={classes.icon}>
         <CartIcon />
      </span>
      <span>
        Your Cart
      </span>
      <span className={classes.badge}>
        {numbersOfCartItems}
      </span>
  </button>)

}
export default HeaderCartButton;