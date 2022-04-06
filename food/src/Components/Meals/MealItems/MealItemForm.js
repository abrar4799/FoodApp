import Input from "../../UI/Input";
import classes  from "./MealItemForm.module.css"
import { useRef , useState } from "react";

const MealItemForm = props => {
    const amountRef = useRef();

    const [amountIsValid , setAmountIsValid ] = useState(true)
    const submitHandler = event =>{
        event.preventDefault() 
        const  enteredAmount = amountRef.current.value
        const enteredAmountNumber = +enteredAmount;
        console.log(enteredAmountNumber , 'item')

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false)
            return;

        }
        props.onAddCart(enteredAmountNumber)
    }

   return (
       <form className={classes.form} onSubmit={submitHandler}>
          <Input 
              ref={amountRef}
              label="Amount" input={{
              id: 'amount' + props.id,
              type : 'number',
              min: '1',
              max: '5',
              step : '1' ,
              defaultValue : '1'
          }}/>
           <button>+ Add</button>
           {!amountIsValid && <p>Please enter a valid amount (1-5). </p>}
       </form>
   )

}
export default MealItemForm;