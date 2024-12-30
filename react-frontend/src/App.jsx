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
  signInPageAction
} from './pages';

import { RootLayout } from './layouts';

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
        element: <SignUpPage />
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
        action: signInPageAction
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
        loader: dashboardPageLoader
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
