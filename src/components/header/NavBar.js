import styles from './NavBar.module.scss';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../context/cartContext';

const NavBar = () => {
  const ctx = useContext(CartContext);
  const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);

  const cartMealsNr = Object.values(ctx.cartMeals).reduce(
    (acc, meal) => acc + meal.amount,
    0
  );

  useEffect(() => {
    if (cartMealsNr === 0) {
      return;
    }
    setIsButtonHighlighted(true);
    const timer = setTimeout(() => {
      setIsButtonHighlighted(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [cartMealsNr]);

  let navCartButtonClass = isButtonHighlighted
    ? `${styles.navCart} ${styles.bump}`
    : `${styles.navCart}`;

  return (
    <nav>
      <h1>My Food Order App</h1>
      <div className={navCartButtonClass} onClick={ctx.showCart}>
        <i className='fas fa-shopping-cart'></i>{' '}
        <span className={styles.text}>Your Cart</span>{' '}
        <span className={styles.amount}>{cartMealsNr}</span>
      </div>
    </nav>
  );
};

export default NavBar;
