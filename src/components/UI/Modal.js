import { Fragment, useContext } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import CartContext from '../../context/cartContext';

const Backdrop = () => {
  const ctx = useContext(CartContext);
  return (
    <div
      className={styles.backdrop}
      onClick={(ctx.hideCart, ctx.hideCheckout)}
    ></div>
  );
};

const ModalOverlay = (props) => {
  return <div className={styles.modalOverlay}>{props.children}</div>;
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById('root-overlays')
      )}

      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById('root-overlays')
      )}
    </Fragment>
  );
};

export default Modal;
