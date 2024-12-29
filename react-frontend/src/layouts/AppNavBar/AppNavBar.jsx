import { AppBar, Box, Stack, Typography } from '@mui/material';
import { MuiToolbar } from '../../components/common';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ColorModeIconDropdown from '../../components/features/AppTheme/ColorModeIconDropdown/ColorModeIconDropdown';
import IconButton from '@mui/material/IconButton';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export default function AppNavBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        display: 'auto',
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        top: 'var(--template-frame-height, 0px)'
      }}
    >
      <MuiToolbar variant="regular">
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            flexGrow: 1,
            width: '100%',
            gap: 1
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: 'center', mr: 'auto' }}
          >
            <CustomIcon />
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: 'text.primary' }}
            >
              Data Bloom
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: 'center', ml: 'auto' }}
          >
            <ColorModeIconDropdown />
            <IconButton size="small">
              <LogoutRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </MuiToolbar>
    </AppBar>
  );
}

export function CustomIcon() {
  return (
    <Box
      sx={{
        width: '1.5rem',
        height: '1.5rem',
        bgcolor: 'black',
        borderRadius: '999px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundImage:
          'linear-gradient(135deg, hsl(210, 98%, 60%) 0%, hsl(210, 100%, 35%) 100%)',
        color: 'hsla(210, 100%, 95%, 0.9)',
        border: '1px solid',
        borderColor: 'hsl(210, 100%, 55%)',
        boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.3)'
      }}
    >
      <DashboardRoundedIcon color="inherit" sx={{ fontSize: '1rem' }} />
    </Box>
  );
}
