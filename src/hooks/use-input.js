import { useState } from 'react';

const useInput = (validate, styles) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const showError = isTouched && !validate(value);
  const valid = !showError && isTouched;

  const onChange = (e) => {
    setValue(e.target.value);
    setIsTouched(true);
  };

  const onBlur = () => {
    setIsTouched(true);
  };

  const clear = () => {
    setValue('');
    setIsTouched(false);
  };

  const classes = showError
    ? `${styles.formControl} ${styles.error}`
    : `${styles.formControl}`;

  return {
    value,
    onChange,
    onBlur,
    classes,
    showError,
    clear,
    valid,
  };
};

export default useInput;
