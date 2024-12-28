import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../../layouts/AppNavBar/AppNavBar';
import Header from '../../layouts/Header/Header';
import MainGrid from '../../components/features/Dashboard/MainGrid/MainGrid';


export default function Dashboard() {
  return (
      <Box sx={{ display: 'flex' }}>
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: 8,
            }}
          >
            <Header />
            <MainGrid />
          </Stack>
        </Box>
      </Box>
  
  );
}


// import { useLoaderData } from 'react-router-dom';

// function Dashboard() {
//   const loaderData = useLoaderData();
//   return (
//     <>
//       <h1>Dashboard Component</h1>
//       {JSON.stringify(loaderData)}
//       {/* {loaderData} */}
//     </>
//   );
// }

// export default Dashboard;

export const loader = async () => {
  try {
    const res = await fetch(
      'https://data-bloom-be.onrender.com/api/v1/google-sheets-pipelines'
    );

    if (!res.ok) {
      throw new Response(
        JSON.stringify({ status: false, message: 'something went wrong' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    return res;
  } catch (err) {
    // throw new Response(JSON.stringify({ status: false, message: err.error }), {
    //   status: 500,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    return err;
  }
};
