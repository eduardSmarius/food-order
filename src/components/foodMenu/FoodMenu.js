import styles from './FoodMenu.module.scss';
import Card from '../../ui/Card';
import MenuItem from './MenuItem';
import { menuItems } from '../../utils/Menu';

const FoodMenu = () => {
  return (
    <Card className={`${styles.card} ${styles.foodMenu}`}>
      <h3 className={styles.menuTitle}>Menu</h3>
      {menuItems.map((item) => (
        <MenuItem item={item} key={item.id} />
      ))}
    </Card>
  );
};

export default FoodMenu;
