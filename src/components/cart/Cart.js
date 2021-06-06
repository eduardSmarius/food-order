import styles from './Cart.module.scss';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { useContext } from 'react';
import CartContext from '../../context/cartContext';
import Modal from '../UI/Modal';

const Cart = () => {
  const ctx = useContext(CartContext);

  return (
    <Modal>
      <Card className={styles.cart}>
        {ctx.cartMeals.map((mealObj) => (
          <div key={Math.random()} className={styles.cartMeal}>
            <div className={styles.cartMealDescription}>
              <h3 className={styles.title}>{mealObj.name}</h3>
              <span className={styles.price}>${mealObj.price}</span>
              <span className={styles.amount}>x {mealObj.amount}</span>
            </div>
            <div className={styles.cartMealModify}>
              <i
                onClick={() => ctx.removeMealsFromCart(mealObj.id)}
                className={`fas fa-minus ${styles.modify}`}
              ></i>
              <i
                onClick={() => ctx.addMealsToCart({ ...mealObj, amount: 1 })}
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
          <Button
            className={styles.close}
            value='Close'
            onClick={ctx.hideCart}
          />
          <Button className={styles.order} value='Order' />
        </div>
      </Card>
    </Modal>
  );
};

export default Cart;
