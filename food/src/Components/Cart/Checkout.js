import classes from './Checkout.module.css'
import { useRef , useState} from 'react';

const isEmpty = value => value.trim() === ''
const isFiveChar = value => value.trim().length === 5

const Checkout = props => {
    const [checkFormValidity , setCheckFormValidity] = useState({
        name: true,
        street: true,
        city : true , 
        postalcode : true
    })
    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()
    
    const confirmHandler = (event) => {
        event.preventDefault();
        const nameEntered = nameInputRef.current.value;
        const streetEntered = streetInputRef.current.value;
        const postalEntered = postalInputRef.current.value;
        const cityEntered = cityInputRef.current.value;

        const nameIsvalid = !isEmpty(nameEntered)
        const streetIsvalid = !isEmpty(streetEntered)
        const cityIsValid = !isEmpty(cityEntered)
        const postalIsValid = isFiveChar(postalEntered)
        setCheckFormValidity({
            name: nameIsvalid ,
            street : streetIsvalid , 
            city : cityIsValid , 
            postalcode : postalIsValid
        })
    const formIsValid  = nameIsvalid && streetIsvalid && cityIsValid && postalIsValid
    if( !formIsValid){
        return;
    }
   
        

    };
    const nameControlClasses = `${classes.control} ${
        checkFormValidity.name ? '' : classes.invalid
      }`;
      const streetControlClasses = `${classes.control} ${
        checkFormValidity.street ? '' : classes.invalid
      }`;
      const postalCodeControlClasses = `${classes.control} ${
        checkFormValidity.postalcode ? '' : classes.invalid
      }`;
      const cityControlClasses = `${classes.control} ${
        checkFormValidity.city ? '' : classes.invalid
      }`;
    return (
        <form onSubmit={confirmHandler}>
           <div className={nameControlClasses}>
               <label htmlFor='name' >Your Name</label>
               <input type='text' id='name' ref={nameInputRef}/>
               {!checkFormValidity.name && <p>Enter Valid Name</p>}
           </div>
           <div className={streetControlClasses}>
               <label htmlFor='street' >Street</label>
               <input type='text' id='street' ref={streetInputRef}/>
               {!checkFormValidity.street && <p>Enter Valid Street</p>}
           </div>
           <div className={postalCodeControlClasses}>
               <label htmlFor='postal' >Postal Code</label>
               <input type='text' id='postal' ref={postalInputRef}/>
               {!checkFormValidity.postalcode && <p>Enter Valid Postal Code</p>}
           </div>
           <div className={cityControlClasses}>
               <label htmlFor='city' >City</label>
               <input type='text' id='city' ref={cityInputRef}/>
               {!checkFormValidity.city && <p>Enter Valid City</p>}
           </div>
           <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
        </form>
    )
};
export default Checkout