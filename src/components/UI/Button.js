import styles from './Button.module.scss';

const Button = (props) => (
  <button
    className={`${props.className} ${styles.button}`}
    onClick={props.onClick}
  >
    {props.value}
  </button>
);

export default Button;
