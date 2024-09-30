import React from 'react';
import { Box, Chip } from '@mui/material';

interface ForecastChipsProps {
  next5Days: Date[];
  selectedDate: string | null;
  onDateSelection: (date: Date) => void;
}

const ForecastChips: React.FC<ForecastChipsProps> = ({
  next5Days,
  selectedDate,
  onDateSelection,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      {next5Days.map((date, index) => (
        <Chip
          key={index}
          label={date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
          })}
          onClick={() => onDateSelection(date)}
          color={
            selectedDate ===
            date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
              ? 'primary'
              : 'default'
          }
          sx={{ marginRight: 1 }}
        />
      ))}
    </Box>
  );
};

export default ForecastChips;
