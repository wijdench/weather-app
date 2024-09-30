import React from 'react';
import { Typography, Box } from '@mui/material';
import UmbrellaIcon from '@mui/icons-material/BeachAccess';

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mt: 2,
      }}
    >
      <UmbrellaIcon fontSize="large" />
      <Typography variant="h4" component="h1">
        Simple Weather App
      </Typography>
    </Box>
  );
};

export default Header;
