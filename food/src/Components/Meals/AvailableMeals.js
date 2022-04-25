import { useEffect ,useState} from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItems/MealItem';
import LoadingIcons from 'react-loading-icons'




const AvailableMeals = () => {
  const [meals , setMeals ] =useState([])
  const [isLoading , setLoading] = useState(true)
useEffect(() =>{

 const fetchMeals = async() =>{
   
  const response = await  fetch('https://foodappbackend-60502-default-rtdb.firebaseio.com/meals.json') 
  const data = await response.json()

  const loadedMeals = []

  for (const key in data){
    loadedMeals.push({
      id: key,
      name: data[key].name,
      description : data[key].description,
      price : data[key].price,
    })
  }
  setMeals(loadedMeals)
  setLoading(false)

 }
 fetchMeals()
 
 
  
} , [])
  if(isLoading){
    return(
      <section style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '60vh'}}>
    <LoadingIcons.Circles />
      </section>
    )
  }


  const mealsList = meals.map((meal) =>
  <MealItem 
    key={meal.id}
    id={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
  />
  );

  return (
    <section className={classes.meals}>
      <Card>
        {console.log(mealsList)}
     <ul>{mealsList}</ul> 
     </Card>
    </section>
  );
};

export default AvailableMeals;