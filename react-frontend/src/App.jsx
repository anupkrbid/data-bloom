import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';

import {
  DashboardPage,
  dashboardPageLoader,
  SignInPage,
  SignUpPage,
  ErrorPage
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
        element: <SignInPage />
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
  return <RouterProvider router={router}></RouterProvider>;
}
