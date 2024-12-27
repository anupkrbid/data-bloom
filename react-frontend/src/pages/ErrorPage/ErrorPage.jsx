import { useRouteError } from 'react-router-dom';
import { Header } from '../../components';

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <Header />
      <h1>Error Page</h1>
      <p>
        {error.data.message} - {error.status}
      </p>
    </>
  );
}

export default ErrorPage;
