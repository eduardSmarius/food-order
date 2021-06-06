import { useContext, useRef } from 'react';
import styles from './Meal.module.scss';
import Button from '../UI/Button';
import CartContext from '../../context/cartContext';

const Meal = ({ meal }) => {
  const { title, description, price, id } = meal;
  const mealAmount = useRef();
  const ctx = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mealAmount.current.value) return;
    ctx.addMealsToCart({
      id: id,
      name: title,
      price: price,
      amount: Number(mealAmount.current.value),
    });
  };

  return (
    <li className={styles.meal}>
      <div className={styles.mealDetails}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <h3 className={styles.price}>${price}</h3>
      </div>

      <form className={styles.addToCart} onSubmit={handleSubmit}>
        <div className={styles.amount}>
          <label htmlFor='amount'>Amount</label>
          <input type='number' min='0' name={title} ref={mealAmount} />
        </div>
        <Button className={styles.button} type='submit' value='+ Add' />
      </form>
    </li>
  );
};

export default Meal;
