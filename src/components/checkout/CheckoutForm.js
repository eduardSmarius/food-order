import styles from './CheckoutForm.module.scss';
import useInput from '../../hooks/use-input';
import { useContext, useState } from 'react';
import CartContext from '../../context/cartContext';
import SendOrder from './SendOrder';

const CheckoutForm = () => {
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);

  const ctx = useContext(CartContext);
  const {
    value: nameValue,
    onChange: onChangeName,
    onBlur: onNameBlur,
    classes: nameClasses,
    showError: showNameError,
    clear: clearName,
    valid: validName,
  } = useInput((val) => val.trim() !== '', styles);

  const {
    value: emailValue,
    onChange: onChangeEmail,
    onBlur: onEmailBlur,
    classes: emailClasses,
    showError: showEmailError,
    clear: clearEmail,
    valid: validEmail,
  } = useInput((val) => val.trim().includes('@'), styles);

  const {
    value: numberValue,
    onChange: onChangeNumber,
    onBlur: onNumberBlur,
    classes: numberClasses,
    showError: showNumberError,
    clear: clearNumber,
    valid: validNumber,
  } = useInput((val) => val.trim().length > 0, styles);

  const {
    value: addressValue,
    onChange: onChangeAddress,
    onBlur: onAddressBlur,
    classes: addressClasses,
    showError: showAddressError,
    clear: clearAddress,
    valid: validAddress,
  } = useInput((val) => val.trim() !== '', styles);

  const inputsObj = {
    name: nameValue,
    email: emailValue,
    number: numberValue,
    address: addressValue,
    meals: ctx.cartMeals,
    totalPrice: ctx.cartTotalPrice,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validName && validEmail && validNumber && validAddress) {
      clearName();
      clearEmail();
      clearNumber();
      clearAddress();
      SendOrder(inputsObj);
      setShowSubmitMessage(true);
      ctx.emptyCart();
    }
  };

  if (showSubmitMessage) {
    return <h1>Your order has been sent. Thank you & see you next time!</h1>;
  }

  return (
    <form className={styles.checkoutForm} onSubmit={(e) => onSubmit(e)}>
      <div className={nameClasses}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          value={nameValue}
          onChange={(e) => onChangeName(e)}
          onBlur={onNameBlur}
        />
        {showNameError && <p>Input is not valid...</p>}
      </div>
      <div className={emailClasses}>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          id='email'
          value={emailValue}
          onChange={(e) => onChangeEmail(e)}
          onBlur={onEmailBlur}
        />
        {showEmailError && <p>Input is not valid...</p>}
      </div>
      <div className={numberClasses}>
        <label htmlFor='number'>Phone Number</label>
        <input
          type='number'
          name='number'
          id='number'
          value={numberValue}
          onChange={(e) => onChangeNumber(e)}
          onBlur={onNumberBlur}
        />
        {showNumberError && <p>Input is not valid...</p>}
      </div>
      <div className={addressClasses}>
        <label htmlFor='address'>Address</label>
        <input
          type='address'
          name='address'
          id='address'
          value={addressValue}
          onChange={(e) => onChangeAddress(e)}
          onBlur={onAddressBlur}
        />
        {showAddressError && <p>Input is not valid...</p>}
      </div>
      <button>Submit</button>
    </form>
  );
};

export default CheckoutForm;
