import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as ReactRouterLink } from 'react-router-dom';
import { MuiCard, TextFormControl } from '../components/common';
import { useTextFormControl } from '../hooks';
import { isEmpty, isEmail, isLength, equals } from 'validator';

export default function SignUp() {
  const {
    value: nameInputValue,
    hasError: nameInputHasError,
    errorMessage: nameInputErrorMessage,
    onValueChange: handleNameInputChange,
    onValueChangeEnd: handleNameInputBlur
  } = useTextFormControl('', (value) => {
    if (isEmpty(value)) {
      return 'Name is required';
    }
    return '';
  });

  const {
    value: emailInputValue,
    hasError: emailInputHasError,
    errorMessage: emailInputErrorMessage,
    onValueChange: handleEmailInputChange,
    onValueChangeEnd: handleEmailInputBlur
  } = useTextFormControl('', (value) => {
    if (isEmpty(value)) {
      return 'Email is required';
    }

    if (!isEmail(value)) {
      return 'Not a valid email';
    }

    return '';
  });

  const {
    value: passwordInputValue,
    hasError: passwordInputHasError,
    errorMessage: passwordInputErrorMessage,
    onValueChange: handlePasswordInputChange,
    onValueChangeEnd: handlePasswordInputBlur
  } = useTextFormControl('', (value) => {
    if (isEmpty(value)) {
      return 'Password is required';
    }

    if (!isLength(value, { min: 8 })) {
      return 'Password should be minimum 8 char long';
    }

    return '';
  });

  const {
    value: confirmPasswordInputValue,
    hasError: confirmPasswordInputHasError,
    errorMessage: confirmPasswordInputErrorMessage,
    onValueChange: handleConfirmPasswordInputChange,
    onValueChangeEnd: handleConfirmPasswordInputBlur
  } = useTextFormControl('', (value) => {
    if (!equals(value, passwordInputValue)) {
      return 'Show match the password field';
    }

    return '';
  });

  // const isFormInvalid =
  //   nameInputHasError ||
  //   emailInputHasError ||
  //   passwordInputHasError ||
  //   confirmPasswordInputHasError;

  const handleSubmit = (event) => {
    if (
      nameInputHasError ||
      emailInputHasError ||
      passwordInputHasError ||
      confirmPasswordInputHasError
    ) {
      event.preventDefault();
      return;
    }

    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password')
    });
  };

  return (
    <>
      <MuiCard variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextFormControl
            id="name"
            label="Full Name"
            name="name"
            fullWidth={true}
            autoComplete="name"
            placeholder="Jon Snow"
            error={nameInputHasError}
            color={nameInputHasError ? 'error' : 'primary'}
            helperText={nameInputErrorMessage}
            value={nameInputValue}
            onChange={handleNameInputChange}
            onBlur={handleNameInputBlur}
          />

          <TextFormControl
            id="email"
            label="Email"
            name="name"
            fullWidth={true}
            autoComplete="email"
            placeholder="your@email.com"
            error={emailInputHasError}
            color={emailInputHasError ? 'error' : 'primary'}
            helperText={emailInputErrorMessage}
            value={emailInputValue}
            onChange={handleEmailInputChange}
            onBlur={handleEmailInputBlur}
          />

          <TextFormControl
            id="password"
            label="Password"
            name="password"
            fullWidth={true}
            autoComplete="password"
            placeholder="••••••"
            error={passwordInputHasError}
            color={passwordInputHasError ? 'error' : 'primary'}
            helperText={passwordInputErrorMessage}
            value={passwordInputValue}
            onChange={handlePasswordInputChange}
            onBlur={handlePasswordInputBlur}
          />

          <TextFormControl
            id="confirm-password"
            label="Confirm Password"
            name="confirmPassword"
            fullWidth={true}
            autoComplete="confirmPassword"
            placeholder="••••••"
            error={confirmPasswordInputHasError}
            color={confirmPasswordInputHasError ? 'error' : 'primary'}
            helperText={confirmPasswordInputErrorMessage}
            value={confirmPasswordInputValue}
            onChange={handleConfirmPasswordInputChange}
            onBlur={handleConfirmPasswordInputBlur}
          />

          {/* <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive updates via email."
          /> */}

          <Button type="submit" fullWidth variant="contained">
            Sign up
          </Button>
        </Box>
        <Divider>
          <Typography sx={{ color: 'text.secondary' }}>or</Typography>
        </Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link
              component={ReactRouterLink}
              to="/sign-in"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </MuiCard>
    </>
  );
}
