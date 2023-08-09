// material-ui
import { Box, useMediaQuery, Typography } from '@mui/material';

// project import
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
      <Box
        m={1}
        //margin
        width="100%"
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
      <Notification />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
      </Box>
      
  );
};

export default HeaderContent;
