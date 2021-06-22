import styles from './Checkout.module.scss';
import Modal from '../UI/Modal';
import Card from '../UI/Card';
import CheckoutForm from './CheckoutForm';
import { useContext } from 'react';
import CartContext from '../../context/cartContext';

const Checkout = () => {
  const ctx = useContext(CartContext);
  return (
    <Modal onClick={ctx.hideCheckout}>
      <Card className={styles.card}>
        <div className={styles.checkout}>
          <h1 className={styles.title}>Checkout</h1>
          <CheckoutForm />
        </div>
      </Card>
    </Modal>
  );
};

export default Checkout;
