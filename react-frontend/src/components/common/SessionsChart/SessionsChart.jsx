import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import { useSearchParams } from 'react-router-dom';
import { indianToUSFormat } from '../../../utils';

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

function getDaysInRange(startDate, endDate) {
  // Convert dates to Date objects if strings are provided
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Array to store dates
  const dates = [];

  // Get month name
  const month = start.toLocaleString('en-US', { month: 'short' });

  // Loop through dates
  const currentDate = new Date(start);
  while (currentDate <= end) {
    dates.push(`${month} ${currentDate.getDate()}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export default function SessionsChart({ chartData }) {
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  // debugger;
  // const data = getDaysInMonth(4, 2024);
  // debugger;
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const data = getDaysInRange(
    indianToUSFormat(startDate),
    indianToUSFormat(endDate)
  );

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark
  ];

  const bar = searchParams.get('feature');

  const barData = chartData.map((data) => data[bar]);

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Time Spent by {bar} from {startDate} to {endDate}
        </Typography>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data,
              tickInterval: (index, i) => (i + 1) % 5 === 0
            }
          ]}
          series={[
            {
              id: bar,
              label: 'Time Spent',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: barData
            }
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-organic': {
              fill: `url('#${bar}')`
            }
          }}
          slotProps={{
            legend: {
              hidden: true
            }
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id={bar} />
        </LineChart>
      </CardContent>
    </Card>
  );
}
