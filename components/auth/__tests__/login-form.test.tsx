import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock the problematic dependencies
jest.mock("lucide-react", () => ({
  AlertCircle: () => null,
  Loader2: () => null,
}));

// Mock the translation provider
jest.mock("@/providers/translation.provider", () => ({
  useTranslation: () => ({
    dictionary: {
      log_in: {
        title: "Log In",
        description: "Welcome back",
        forgot_password: "Forgot password?",
        have_account: "Don't have an account?",
        with_google: "Continue with Google",
      },
      form: {
        email: "Email",
        password: "Password",
      },
      sign_up: {
        title: "Sign Up",
      },
      error: {},
    },
  }),
}));

// Import the component AFTER all mocks are set up
import { LoginForm } from "../login-form";

describe("LoginForm", () => {
  it("renders the login form correctly", () => {
    render(<LoginForm />);

    // Check if the email input is rendered
    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();

    // Check if the password input is rendered
    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();

    // Check if the submit button is rendered
    const submitButton = screen.getByRole("button", { name: "Log In" });
    expect(submitButton).toBeInTheDocument();
  });

  it("validate required fields", async () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole("button", { name: "Log In" });
    await userEvent.click(submitButton);

    expect(await screen.findByText("email_required")).toBeInTheDocument();
    expect(await screen.findByText("password_required")).toBeInTheDocument();
  });
});
