import React from 'react';
import { Button } from '@mui/material';

interface ForecastToggleButtonProps {
  isForecastVisible: boolean;
  onClick: () => void;
}

const ForecastToggleButton: React.FC<ForecastToggleButtonProps> = ({
  isForecastVisible,
  onClick,
}) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        borderColor: isForecastVisible ? 'black' : '',
        color: isForecastVisible ? 'black' : '',
      }}
    >
      {isForecastVisible ? 'Close' : 'See Forecast'}
    </Button>
  );
};

export default ForecastToggleButton;
