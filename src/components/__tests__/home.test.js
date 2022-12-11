import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Home from "../pages/Home";
import "@testing-library/jest-dom";
import ListCard from "../layout/cards";

describe("Home", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const initialState = {
    npReducers: {
      dashboard: {
        loading: true,
        newList: [],
        listByState: "All",
      },
    },
  };
  let store;
  test("Checking register button", () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByText("The New York Times")).toBeInTheDocument();
  });
});
