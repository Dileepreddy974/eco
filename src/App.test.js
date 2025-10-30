import { render, screen } from '@testing-library/react';
import App from './App';

test('renders friendly eco app', () => {
  render(<App />);
  const element = screen.getByText(/eco/i);
  expect(element).toBeInTheDocument();
});
