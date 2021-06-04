import { Fragment, useContext } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import CartContext from '../context/cartContext';
import CartOverlay from './CartOverlay';

const Modal = () => {
  const ctx = useContext(CartContext);
  const Backdrop = () => (
    <div className={styles.backdrop} onClick={ctx.hideCart}></div>
  );

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <CartOverlay />,
        document.getElementById('cartOverlay-root')
      )}
    </Fragment>
  );
};

export default Modal;
