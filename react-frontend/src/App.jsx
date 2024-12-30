import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import {
  DashboardPage,
  dashboardPageLoader,
  SignInPage,
  SignUpPage,
  ErrorPage,
  signInPageAction,
  signUpPageAction
} from './pages';

import { RootLayout } from './layouts';
import { protectedRouteLoader, unprotectedRouteLoader } from './utils';
import { signOutAction } from './components/features';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/sign-in" replace />
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
        action: signUpPageAction,
        loader: unprotectedRouteLoader
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
        action: signInPageAction,
        loader: unprotectedRouteLoader
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
        loader: dashboardPageLoader
      },
      {
        path: 'sign-out',
        loader: protectedRouteLoader,
        action: signOutAction
      }
    ]
  }
]);

export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <RouterProvider router={router}></RouterProvider>
    </SnackbarProvider>
  );
}
