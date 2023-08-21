
// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
      <Typography color='primary' variant="h1" component='h2'>
          LOGO
        </Typography>
        
      </Stack>
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
