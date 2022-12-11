import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import Home from "../pages/Home";
afterAll(() => {
  cleanup();
});

test("Multi Select renders value", async () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const initialState = {
    npReducers: {
      dashboard: {
        loading: true,
        newsList: [],
        listByState: "All",
      },
    },
  };
  let store;

  store = mockStore(initialState);
  const { getByTestId } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  getByTestId("homeCard");

  await waitFor(() => expect(getByTestId("homeCard")).toBeTruthy());
});
