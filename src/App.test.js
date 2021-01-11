import { render, screen } from '@testing-library/react';
import App from './App';
import Photos from './components/Photos/Photos';

test('App render', () => {
  render(<App />);
  const linkElement = screen.getByText(/Imaginary/i);
  expect(linkElement).toBeInTheDocument();
});

test('Photos render', () => {
  render(<Photos />);
  const linkElement = screen.getByText(/Imaginary/i);
  expect(linkElement).toBeInTheDocument();
});

test('Sortbar render', () => {
  render(<Photos />);
  const linkElement = screen.getAllByText(/Most/i);
  expect(linkElement.length).toEqual(2);
});