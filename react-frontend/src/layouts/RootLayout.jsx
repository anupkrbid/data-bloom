import { Outlet } from 'react-router-dom';
import { MuiFlexContainer, AppNavBar } from '../components/common';

function RootLayout() {
  // return (
  //   <>
  //     {/* <Header></Header> */}
  //     <Outlet />
  //   </>
  // );
  return (
    <MuiFlexContainer direction="column" justifyContent="space-between">
      <AppNavBar />
      <Outlet />
    </MuiFlexContainer>
  );
}

export default RootLayout;
