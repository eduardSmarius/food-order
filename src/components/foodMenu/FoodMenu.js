import styles from './FoodMenu.module.scss';
import Card from '../UI/Card';
import Meal from './Meal';
import { useState, useEffect } from 'react';

const FoodMenu = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    fetch(
      'https://react-test-6b77b-default-rtdb.europe-west1.firebasedatabase.app/menu.json'
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setMeals(data);
      })
      .catch((err) => {
        console.log('Error:', err);
        setLoading(false);
        setShowError(true);
      });
  }, [meals]);

  return (
    <Card className={`${styles.card} ${styles.foodMenu}`}>
      <h3 className={styles.menuTitle}>Menu</h3>
      {loading && <h4>Loading...</h4>}
      {showError && meals.length === 0 && <h4>Could not get meals...</h4>}
      {meals.map((meal) => (
        <Meal meal={meal} key={meal.id} />
      ))}
    </Card>
  );
};

export default FoodMenu;
