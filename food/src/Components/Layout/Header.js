import { Fragment } from "react";
import mealsImg from '../../assets/meals.jpg'
import classes from "./Header.module.css"
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
   return <Fragment>
       {/*console.log(props , "console from header")*/}
       <header className={classes.header}>
          <h1>Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
       </header>
       <div className={classes['main-image']}>
        <img src={mealsImg}  alt="Meals Image"/>
       </div>
   </Fragment>
}
export default Header;