import React from 'react';
import { Box, Typography } from '@mui/material';
import UmbrellaIcon from '@mui/icons-material/BeachAccess';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        bottom: 0,
        width: '100%',
        py: 1,
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '0.875rem',
      }}
    >
      <UmbrellaIcon data-testid="UmbrellaIcon" sx={{ mr: 1 }} />
      <Typography variant="body2">Weather app by Wijden</Typography>
    </Box>
  );
};

export default Footer;
