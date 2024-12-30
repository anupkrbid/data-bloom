import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Header from '../layouts/Header/Header';
import MainGrid from '../components/features/Dashboard/MainGrid/MainGrid';
import axiosInstance from '../configs/axios';
import { isAuthenticated } from '../utils';
import { redirect } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <Box
      component="main"
      sx={(theme) => ({
        flexGrow: 1,
        backgroundColor: theme.vars
          ? `rgba(${theme.vars.palette.background.defaultChannel}, 1)`
          : alpha(theme.palette.background.default, 1),
        overflow: 'auto'
      })}
    >
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
          mx: 3,
          pb: 5,
          mt: 8
        }}
      >
        <Header />
        <MainGrid />
      </Stack>
    </Box>
  );
}

export const loader = async () => {
  try {
    if (!isAuthenticated()) {
      return redirect('/sign-in');
    }

    const res = await axiosInstance.get('v1/google-sheets-pipelines');

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};
