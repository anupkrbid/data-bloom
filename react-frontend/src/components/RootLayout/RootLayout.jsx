import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  );
}

export default RootLayout;
