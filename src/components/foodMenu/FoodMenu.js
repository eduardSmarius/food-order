import styles from './FoodMenu.module.scss';
import Card from '../UI/Card';
import Meal from './Meal';
import { meals } from '../../assets/Menu';

const FoodMenu = () => {
  return (
    <Card className={`${styles.card} ${styles.foodMenu}`}>
      <h3 className={styles.menuTitle}>Menu</h3>
      {meals.map((meal) => (
        <Meal meal={meal} key={meal.id} />
      ))}
    </Card>
  );
};

export default FoodMenu;
