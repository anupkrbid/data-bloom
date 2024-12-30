import SignInPage, { action as signInPageAction } from './SignInPage';
import SignUpPage, { action as signUpPageAction } from './SignUpPage';
import ErrorPage from './ErrorPage';
import DashboardPage, { loader as dashboardPageLoader } from './DashboardPage';

export {
  SignInPage,
  SignUpPage,
  ErrorPage,
  DashboardPage,
  dashboardPageLoader,
  signInPageAction,
  signUpPageAction
};
