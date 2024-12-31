import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';

export default function PageViewsBarChart({ chartData }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light
  ];

  const barChartData = chartData.reduce(
    (acc, cur) => {
      return {
        A: Number(acc.A) + Number(cur.A),
        B: Number(acc.B) + Number(cur.B),
        C: Number(acc.C) + Number(cur.C),
        D: Number(acc.D) + Number(cur.D),
        E: Number(acc.E) + Number(cur.E),
        F: Number(acc.F) + Number(cur.F)
      };
    },
    { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 }
  );

  function clickHandler(event, barItemIdentifier) {
    const bar = Object.keys(barChartData)[barItemIdentifier.dataIndex];
    setSearchParams((prev) => {
      prev.set('feature', bar);
      return prev;
    });
  }

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Time Spend on feature views from {chartData[0]?.Day} -{' '}
          {chartData[chartData.length - 1]?.Day}
        </Typography>
        <BarChart
          layout="horizontal"
          borderRadius={8}
          colors={colorPalette}
          onItemClick={clickHandler}
          yAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: Object.keys(barChartData)
            }
          ]}
          series={[
            {
              id: 'page-views',
              label: 'Time Spent',
              data: Object.values(barChartData),
              stack: 'A'
            }
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true
            }
          }}
        />
      </CardContent>
    </Card>
  );
}
