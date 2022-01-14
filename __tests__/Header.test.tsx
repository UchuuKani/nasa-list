// __tests__/index.test.jsx

/**
 * @jest-environment jsdom
 */

//  The @jest-environment jsdom comment above configures the testing environment as jsdom inside the test file because React Testing Library uses DOM elements
//  like document.body which will not work in Jest's default node testing environment. Alternatively, you can also set the jsdom environment globally by adding
//  the Jest configuration option: "testEnvironment": "jsdom" in jest.config.js

import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../src/components/Header";

describe("The header", () => {
  it("renders a heading on large screens", () => {
    render(<Header />);

    const headerLink = screen.getByText(/explore the cosmos/i);

    expect(headerLink).toBeInTheDocument();
  });

  it("renders a link to see the feed", () => {
    render(<Header />);

    const feedLink = screen.getByText(/feed/i);

    expect(feedLink).toBeInTheDocument();
  });

  it("renders a link to see likes", () => {
    render(<Header />);

    const likesLink = screen.getByRole("link", { name: "Likes" });

    expect(likesLink).toBeInTheDocument();
  });
});
