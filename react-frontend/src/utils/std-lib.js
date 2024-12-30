export const isDefinedAndNotNull = (value) => {
  return value !== undefined && value !== null;
};

export const isDefinedAndNotEmptyString = (value) => {
  if (!isDefinedAndNotNull(value)) {
    return false;
  }
  if (typeof value === 'string') {
    return value !== '';
  }
  return true;
};
