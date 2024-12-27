import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
        path: '',
        element: <SignIn />
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

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
