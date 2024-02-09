import { render, screen } from "@testing-library/react";
import App from "./App";

test("to check the text Campaign Management", () => {
  render(<App />);
  const linkElement = screen.getByText(/Campaign Management/i);
  expect(linkElement).toBeInTheDocument();
});
