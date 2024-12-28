import * as React from 'react';
import Stack from '@mui/material/Stack';
import CustomDatePicker from '../../components/common/CustomDataPicker/CustomDataPicker';
import ColorModeIconDropdown from '../../components/features/AppTheme/ColorModeIconDropdown/ColorModeIconDropdown';

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <Stack direction="row" sx={{ gap: 1 }}>
        <CustomDatePicker />
        {/* <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton> */}
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}