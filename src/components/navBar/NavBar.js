import styles from './NavBar.module.scss';
import { useContext } from 'react';
import CartContext from '../context/cartContext';

const NavBar = () => {
  const ctx = useContext(CartContext);
  return (
    <nav>
      <h1>My Food Order App</h1>
      <div className={styles.navCart} onClick={ctx.showCart}>
        <i className='fas fa-shopping-cart'></i>{' '}
        <span className={styles.text}>Your Cart</span>{' '}
        <span className={styles.amount}>{ctx.cartItemsNr}</span>
      </div>
    </nav>
  );
};

export default NavBar;
