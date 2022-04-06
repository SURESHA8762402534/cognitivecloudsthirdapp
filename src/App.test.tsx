import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RawJSON from "./components/RawJSON";
import FrontPage from "./components/FrontPage";


describe("test on RawJSON component", () => {
  test("test to find button", () => {
    render(
      <BrowserRouter>
        <RawJSON></RawJSON>
      </BrowserRouter>
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });
});

describe("frontpage component", () => {
  test("rendering frontpage tabele component", () => {
    render(
      <BrowserRouter>
        <FrontPage />
      </BrowserRouter>
    );

    screen.debug();
  });
});