import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { MuiCard, TextFormControl } from '../components/common';
// import { ForgotPasswordModal } from '../components';
import {
  Link as ReactRouterLink,
  redirect,
  useActionData,
  useSubmit
} from 'react-router-dom';
import { useTextFormControl } from '../hooks';
import { isEmail, isEmpty, isLength } from 'validator';
import axiosInstance from '../configs/axios';
import { useSnackbar } from 'notistack';
import { isDefinedAndNotNull } from '../utils';
import { useEffect } from 'react';
// import { useState } from 'react';

export default function SignIn() {
  // const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const actionError = useActionData();
  const submit = useSubmit();

  useEffect(() => {
    if (isDefinedAndNotNull(actionError)) {
      enqueueSnackbar(actionError.message, { variant: 'error' });
      if (isDefinedAndNotNull(actionError.error)) {
        for (const [_, value] of Object.entries(actionError.error)) {
          enqueueSnackbar(value, { variant: 'error' });
        }
      }
    }
  }, [actionError, enqueueSnackbar]);

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

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // debugger;
    if (emailInputHasError || passwordInputHasError) {
      // event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    submit(data, { method: 'POST' });
  };

  return (
    <MuiCard variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2
        }}
      >
        <TextFormControl
          id="email"
          label="Email"
          name="email"
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
          type="password"
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

        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ForgotPasswordModal open={open} handleClose={handleClose} /> */}

        <Button type="submit" fullWidth variant="contained">
          Sign in
        </Button>
        {/* <Link
          component="button"
          type="button"
          onClick={handleClickOpen}
          variant="body2"
          sx={{ alignSelf: 'center' }}
        >
          Forgot your password?
        </Link> */}
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link
            component={ReactRouterLink}
            to="/sign-up"
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </MuiCard>
  );
}

export async function action({ request }) {
  try {
    const data = await request.formData();

    const payload = {
      email: data.get('email'),
      password: data.get('password')
    };

    const res = await axiosInstance.request({
      url: '/v1/auth/sign-in',
      method: request.method,
      data: JSON.stringify(payload)
    });
    return redirect('/dashboard');
  } catch (err) {
    return err.response.data;
  }
}
