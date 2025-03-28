import { render, screen } from "@testing-library/react";
import AboutSocials from "../socials";
import { PROFESSIONAL_EMAIL } from "../constants";

describe("AboutSocials Component", () => {
  it("renders the email link correctly", async () => {
    const dictionary = await import("@/get-dictionary").then((mod) =>
      mod.getDictionary("en")
    );

    render(<AboutSocials dictionary={dictionary} />);

    // Check if the email link is rendered
    const emailLink = screen.getByText(PROFESSIONAL_EMAIL);
    expect(emailLink).toBeInTheDocument();

    // Check if the email link has the correct href
    const emailAnchor = screen.getByRole("link", { name: PROFESSIONAL_EMAIL });
    expect(emailAnchor).toHaveAttribute("href", `mailto:${PROFESSIONAL_EMAIL}`);
  });
});
