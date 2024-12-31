import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import PageViewsBarChart from '../../../common/PageViewsBarChart/PageViewsBarChart';
import SessionsChart from '../../../common/SessionsChart/SessionsChart';

import { useLoaderData, useSearchParams } from 'react-router-dom';
import { isDefinedAndNotNull } from '../../../../utils';

export default function MainGrid() {
  const chartData = useLoaderData();
  const [searchParams] = useSearchParams();

  const processedData = filterData(
    chartData,
    extractFiltersFromUrl(searchParams)
  );

  const showSesssionChart = isDefinedAndNotNull(searchParams.get('feature'));

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, md: showSesssionChart ? 6 : 12 }}>
          <PageViewsBarChart chartData={processedData} />
        </Grid>
        {showSesssionChart && (
          <Grid size={{ xs: 12, md: 6 }}>
            <SessionsChart />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

function extractFiltersFromUrl(searchParams) {
  const filters = {};

  const age = searchParams.get('age');
  if (isDefinedAndNotNull(age)) {
    filters.age = age;
  }
  const gender = searchParams.get('gender');
  if (isDefinedAndNotNull(gender)) {
    filters.gender = gender;
  }

  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  if (isDefinedAndNotNull(startDate) && isDefinedAndNotNull(endDate)) {
    filters.startDate = startDate;
    filters.endDate = endDate;
  }
  return filters;
}

function filterData(data, filters) {
  const filteredData = data[0].sheets.Sheet3.filter((item) => {
    let matchesFilters = true;

    if (filters.age) {
      matchesFilters = matchesFilters && item.Age === filters.age;
    }

    if (filters.gender) {
      matchesFilters = matchesFilters && item.Gender === filters.gender;
    }

    if (filters.startDate && filters.endDate) {
      const itemDate = new Date(indianToUSFormat(item.Day));
      const startDate = new Date(indianToUSFormat(filters.startDate));
      const endDate = new Date(indianToUSFormat(filters.endDate));
      matchesFilters =
        matchesFilters && itemDate >= startDate && itemDate <= endDate;
    }

    return matchesFilters;
  });

  return filteredData;
}

function indianToUSFormat(indianDate) {
  const [day, month, year] = indianDate.split('/');

  return `${month}/${day}/${year}`;
}
