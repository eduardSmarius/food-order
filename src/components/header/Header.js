import styles from './Header.module.scss';
import Card from '../UI/Card';

const Header = () => {
  return (
    <header>
      <div className={styles.imageHeader} />
      <Card className={styles.headerCard}>
        <div className={styles.headerMessage}>
          <h1>Delicious Food, Delivered to You</h1>
          <p>
            Choose your favourite meal from our broad selection of available
            meals & enjoy a delicious lunch or dinner at home.
            <br />
            <br />
            All our meals are cooked with high-quality ingredients, just-in-time
            & of course, by experienced chefs.
          </p>
        </div>
      </Card>
    </header>
  );
};

export default Header;
