import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageViewsBarChart from '../../../common/PageViewsBarChart/PageViewsBarChart';
import SessionsChart from '../../../common/SessionsChart/SessionsChart';


export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/*<Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>*/}
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
    </Box>
  );
}
