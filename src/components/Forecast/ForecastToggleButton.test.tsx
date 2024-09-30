import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ForecastToggleButton from './ForecastToggleButton';

it('renders "See Forecast" when forecast is not visible', () => {
  render(<ForecastToggleButton isForecastVisible={false} onClick={jest.fn()} />);

  expect(screen.getByText('See Forecast')).toBeInTheDocument();
});

it('renders "Close" when forecast is visible', () => {
  render(<ForecastToggleButton isForecastVisible={true} onClick={jest.fn()} />);

  expect(screen.getByText('Close')).toBeInTheDocument();
});

it('calls onClick handler when button is clicked', () => {
  const mockOnClick = jest.fn();
  render(<ForecastToggleButton isForecastVisible={false} onClick={mockOnClick} />);

  fireEvent.click(screen.getByText('See Forecast'));

  expect(mockOnClick).toHaveBeenCalledTimes(1);
});

it('renders without onClick handler (no crash)', () => {
  render(<ForecastToggleButton isForecastVisible={false} onClick={undefined as any} />);

  expect(screen.getByText('See Forecast')).toBeInTheDocument();
});

it('applies correct styles when forecast is visible', () => {
  render(<ForecastToggleButton isForecastVisible={true} onClick={jest.fn()} />);

  const button = screen.getByText('Close');

  expect(button).toHaveStyle('border-color: black');
  expect(button).toHaveStyle('color: black');
});
