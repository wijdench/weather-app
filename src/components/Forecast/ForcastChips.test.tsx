import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ForecastChips from './ForecastChips';

describe('ForecastChips Component', () => {
  const mockOnDateSelection = jest.fn();

  const mockNext5Days = [
    new Date(2024, 8, 28),
    new Date(2024, 8, 29),
    new Date(2024, 8, 30),
    new Date(2024, 9, 1),
    new Date(2024, 9, 2),
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct number of chips based on next5Days', () => {
    render(
      <ForecastChips
        next5Days={mockNext5Days}
        selectedDate={null}
        onDateSelection={mockOnDateSelection}
      />
    );

    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('displays the correct label on each chip', () => {
    render(
      <ForecastChips
        next5Days={mockNext5Days}
        selectedDate={null}
        onDateSelection={mockOnDateSelection}
      />
    );

    expect(screen.getByText('28 Sept')).toBeInTheDocument();
    expect(screen.getByText('29 Sept')).toBeInTheDocument();
    expect(screen.getByText('30 Sept')).toBeInTheDocument();
    expect(screen.getByText('1 Oct')).toBeInTheDocument();
    expect(screen.getByText('2 Oct')).toBeInTheDocument();
  });

  it('highlights the selected date with primary color', () => {
    const selectedDate = '30 Sept';

    render(
      <ForecastChips
        next5Days={mockNext5Days}
        selectedDate={selectedDate}
        onDateSelection={mockOnDateSelection}
      />
    );

    const selectedChip = screen.getByRole('button', { name: selectedDate });

    expect(selectedChip).toHaveClass('MuiChip-colorPrimary');
  });

  it('calls onDateSelection when a chip is clicked', () => {
    render(
      <ForecastChips
        next5Days={mockNext5Days}
        selectedDate={null}
        onDateSelection={mockOnDateSelection}
      />
    );

    const chipToClick = screen.getByText('28 Sept');
    fireEvent.click(chipToClick);

    expect(mockOnDateSelection).toHaveBeenCalledWith(mockNext5Days[0]);
  });

  it('renders correctly when next5Days is an empty array', () => {
    render(
      <ForecastChips
        next5Days={[]}
        selectedDate={null}
        onDateSelection={mockOnDateSelection}
      />
    );

    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('renders correctly when no date is selected', () => {
    render(
      <ForecastChips
        next5Days={mockNext5Days}
        selectedDate={null}
        onDateSelection={mockOnDateSelection}
      />
    );

    const chips = screen.getAllByRole('button');
    chips.forEach((chip) => {
      expect(chip).not.toHaveClass('MuiChip-colorPrimary');
    });
  });
});
