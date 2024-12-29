import { tabsClasses } from '@mui/material/Tabs';
import { Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MuiToolbar = styled(Toolbar)({
  width: '100%',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: '8px',
    p: '8px',
    pb: 0
  }
});
