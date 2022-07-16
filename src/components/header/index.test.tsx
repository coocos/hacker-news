import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from ".";
import { ThemeProvider } from "../../context/theme";

describe("Header", () => {
  test("changes icon when dark mode button is clicked", async () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    expect(screen.getByTestId("dark-icon")).toBeInTheDocument();
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(screen.getByTestId("light-icon")).toBeInTheDocument();
  });
});
