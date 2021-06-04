import { useContext, useRef } from 'react';
import styles from './MenuItem.module.scss';
import Button from '../../ui/Button';
import CartContext from '../context/cartContext';

const MenuItem = ({ item }) => {
  const { title, description, price } = item;
  const itemQuantity = useRef();
  const ctx = useContext(CartContext);

  return (
    <div className={styles.menuItem}>
      <div className={styles.itemDetails}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <h3 className={styles.price}>${price}</h3>
      </div>

      <form
        className={styles.addToCart}
        onSubmit={(e) => {
          let currentItem = {
            name: title,
            price: price,
            quantity: Number(itemQuantity.current.value),
          };
          ctx.addItemsToCart(e, currentItem);
        }}
      >
        <div className={styles.amount}>
          <label htmlFor='amount'>Amount</label>
          <input type='number' min='0' name={title} ref={itemQuantity} />
        </div>
        <Button className={styles.button} type='submit' value='+ Add' />
      </form>
    </div>
  );
};

export default MenuItem;
