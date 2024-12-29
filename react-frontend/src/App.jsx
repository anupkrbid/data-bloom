import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';

import { Dashboard, dashboardLoader, SignIn, SignUp } from './pages';
import { RootLayout } from './components';
import ErrorPage from './pages/ErrorPage/ErrorPage';

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
        element: <SignUp />
      },
      {
        path: 'sign-in',
        element: <SignIn />
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: dashboardLoader
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
