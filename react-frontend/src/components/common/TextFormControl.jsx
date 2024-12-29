import { FormControl, FormLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';

export default function TextFormControl({ id, label, ...props }) {
  return (
    <>
      <FormControl>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <TextField id={id} {...props} />
      </FormControl>
    </>
  );
}

TextFormControl.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
