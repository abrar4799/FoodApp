import { Fragment } from 'react'
import ReactDOM from 'react-dom';
import classes from './Model.module.css'


const Backdrop =  props =>{
    return <div className={classes.Backdrop} onClick={props.onClose}/>
}
const ModelOverly = props =>{
    return (
        <div className={classes.modal}>
               <div className={classes.content}> {props.children}</div>
        </div>
     
    )

}
const portalElement = document.getElementById('overlays')
const Model = props =>{
    return(

       <Fragment >
       { ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,  portalElement)}
         { ReactDOM.createPortal(<ModelOverly>{props.children}</ModelOverly> , portalElement)}
       </Fragment>
    )

}
export default Model;