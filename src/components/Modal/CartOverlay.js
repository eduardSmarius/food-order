import styles from './CartOverlay.module.scss';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useContext } from 'react';
import CartContext from '../context/cartContext';

const CartOverlay = () => {
  const ctx = useContext(CartContext);

  return (
    <Card className={styles.cartOverlay}>
      {Object.values(ctx.cartItems).map((itemObj) => (
        <div key={Math.random()} className={styles.cartItem}>
          <div className={styles.cartItemDescription}>
            <h3 className={styles.title}>{itemObj.name}</h3>
            <span className={styles.price}>${itemObj.price}</span>
            <span className={styles.amount}>x {itemObj.quantity}</span>
          </div>
          <div className={styles.cartItemModify}>
            <i
              value={itemObj.name}
              onClick={(e) => ctx.minusCartItem(e.target.attributes[0].value)}
              className={`fas fa-minus ${styles.modify}`}
            ></i>
            <i
              value={itemObj.name}
              onClick={(e) => ctx.plusCartItem(e.target.attributes[0].value)}
              className={`fas fa-plus ${styles.modify}`}
            ></i>
          </div>
        </div>
      ))}
      <div className={styles.cartTotal}>
        <h3 className={styles.totalTitle}>Total Amount:</h3>
        <h3 className={styles.totalAmount}>${ctx.cartTotalPrice}</h3>
      </div>
      <div className={styles.cartSubmit}>
        <Button className={styles.close} value='Close' onClick={ctx.hideCart} />
        <Button className={styles.order} value='Order' />
      </div>
    </Card>
  );
};

export default CartOverlay;
