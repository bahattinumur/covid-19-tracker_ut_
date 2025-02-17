import { render, screen } from "@testing-library/react";
import DetailPage from ".";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import { thunk } from "redux-thunk";
import { storeData } from "../../constants";

// Install the store in the test environment and tell the user that we are using thunk middleware.
const mockStore = configureStore([thunk]);

it("In case of loading, the correct components are printed on the screen", () => {
  // Simulate the Store in loading state
  const store = mockStore({
    isLoading: true,
    error: false,
    data: null,
  });

  // Render the component by defining the required containers
  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );

  // Check if the loader appears on the screen
  screen.getAllByTestId("card-loader");
  screen.getByTestId("header-loader");
});

it("In case of error, the correct error component is printed on the screen.", () => {
  // Simulate store's data in error state
  const store = mockStore({
    isLoading: false,
    error: "Cannot read properties of undefined (reading 'region')",
    data: null,
  });

  // Render the component to be tested
  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );

  // Is the component that displays the error message printed on the screen?
  screen.getByText(/Cannot read properties/i);
});

it("In case of data incoming, the correct cards are printed on the screen.", () => {
  const store = mockStore(storeData);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );

  //*1) Are country details displayed on the screen?

  // Does the country flag appear on the screen?
  const image = screen.getByRole("img");

  // Check Is the source of the image correct?
  expect(image).toHaveProperty("src", "https://flagcdn.com/br.svg");

  // Is the country title displayed on the screen?
  const title = screen.getByTestId("title");

  // Is the content of the title correct?
  expect(title).toHaveTextContent("Brazil");

  //*2) Do the cards appear on the screen?

  // Converted the Covid object to an array as in the component
  const covidData = Object.entries(storeData.data.covid);

  // Check if the key and value values ​​for each element in the array are printed to the screen?
  covidData.forEach((item) => {
    // The titles correct?
    screen.getAllByText(item[0].split("_").join(" "), { exact: false });

    // Did the values ​​have come correct?
    screen.getAllByText(item[1]);
  });
});
