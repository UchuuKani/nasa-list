// __tests__/index.test.jsx

/**
 * @jest-environment jsdom
 */

//  The @jest-environment jsdom comment above configures the testing environment as jsdom inside the test file because React Testing Library uses DOM elements
//  like document.body which will not work in Jest's default node testing environment. Alternatively, you can also set the jsdom environment globally by adding
//  the Jest configuration option: "testEnvironment": "jsdom" in jest.config.js

import React from "react";
import { render, screen, within } from "@testing-library/react";
import CardList from "../src/components/CardList";
import { fakeTenCount } from "../src/utils/helpers";

describe("The Nasa List", () => {
  it("renders a list of cards with a title for each one", () => {
    render(
      <CardList
        imgDataList={fakeTenCount}
        likeImage={() => {
          return;
        }}
        removeLike={() => {
          return;
        }}
        likedImages={[]}
      />
    );

    const cardListRender = screen.getByRole("list");

    const { getAllByRole } = within(cardListRender);

    const cardList = getAllByRole("listitem");

    expect(cardList).toHaveLength(10);
  });
});
