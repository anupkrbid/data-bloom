import { useState } from 'react';
import { isDefinedAndNotEmptyString, isDefinedAndNotNull } from '../utils';

export default function useTextFormControl(defaultValue, validationFn) {
  const [value, setValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  function onValueChange(event) {
    setValue(event.target.value);
    setDidEdit(false);
  }

  function onValueChangeEnd() {
    setDidEdit(true);
  }

  const validationErrorMessage = isDefinedAndNotNull(validationFn)
    ? validationFn(value)
    : '';

  const hasError =
    didEdit && isDefinedAndNotEmptyString(validationErrorMessage);

  return {
    value,
    hasError,
    errorMessage: hasError ? validationErrorMessage : '',
    onValueChange,
    onValueChangeEnd
  };
}
