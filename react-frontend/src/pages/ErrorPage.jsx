import { useRouteError } from 'react-router-dom';
import { AppNavBar } from '../components/common';

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <AppNavBar />
      <h1>Error Page</h1>
      <p>
        {error.data.message} - {error.status}
      </p>
    </>
  );
}

export default ErrorPage;
