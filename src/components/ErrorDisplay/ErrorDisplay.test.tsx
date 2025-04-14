import { render, screen } from "@testing-library/react";
import ErrorDisplay from ".";
import userEvent from "@testing-library/user-event";

describe("error display comp", () => {
  beforeEach(() => {
  });

  beforeAll(() => {
  });

  test("Show the right message", () => {
    const errorMessage = "404 content was not found";
    render(<ErrorDisplay message={errorMessage} retry={() => {}} />);

    // Is there a post with the correct error message?
    screen.getByText(errorMessage);

    // expect(item).toBeInTheDocument();
  });

  test("When you press the retry button, the function is executed.", async () => {
    // Setup the User
    const user = userEvent.setup();

    // Create a Mock func.
    const retryMock = jest.fn();

    // Render the Component
    render(<ErrorDisplay message={"xx"} retry={retryMock} />);

    // Call the Button
    const button = screen.getByRole("button");

    // Butona tıkla
    await user.click(button);

    // Check if function was called?
    expect(retryMock).toHaveBeenCalled();
  });
});
