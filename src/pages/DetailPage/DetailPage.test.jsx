import { render, screen } from "@testing-library/react";
import DetailPage from ".";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import { thunk } from "redux-thunk";
import { storeData } from "../../constants";

// Test ortamındaki store'un kurlumunu yap thunk middleware'i kullandığımız söyle
const mockStore = configureStore([thunk]);

it("yüklenme durumunda doğru bileşenler ekrana basılır", () => {
  // Store'un yüklenme durumundaki halini simüle et
  const store = mockStore({
    isLoading: true,
    error: false,
    data: null,
  });

  // Bileşeni gerekli kapsayıcıları tanımlayarak renderla
  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );

  // Loader ekrana geliyor mu kontrol et
  screen.getAllByTestId("card-loader");
  screen.getByTestId("header-loader");
});

it("hata durumunda doğru hata bileşeni ekrana basılır", () => {
  // Store'un hata durumundaki  verisini simüle et
  const store = mockStore({
    isLoading: false,
    error: "Cannot read properties of undefined (reading 'region')",
    data: null,
  });

  // Test edilecek bileşeni renderla
  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );

  // Hatanın mesajını gösteren bileşen ekrana basıldı mı?
  screen.getByText(/Cannot read properties/i);
});

it("veri gelme durumunda doğru kartlar ekrana basılır", () => {
  const store = mockStore(storeData);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );

  //*1) ülke detayları ekrana geliyor mu?

  // Ülke bayrağı ekrana geliyor mu ?
  const image = screen.getByRole("img");

  // Resmin kaynağı doğru mu?
  expect(image).toHaveProperty("src", "https://flagcdn.com/br.svg");

  // Ülke başlığı ekrana geliyor mu ?
  const title = screen.getByTestId("title");

  // Başlığın içeriği doğru mu?
  expect(title).toHaveTextContent("Brazil");

  //*2) Kartlar ekrana geliyor mu?

  // Kovid nesnesini bileşende olduğu gibi diziye çevirdik
  const covidData = Object.entries(storeData.data.covid);

  // Dizideki her bir eleman için key ve value değerleri ekrana basılıyor mu kontrol et?
  covidData.forEach((item) => {
    // başlıklar doğru geldi mi?
    screen.getAllByText(item[0].split("_").join(" "), { exact: false });

    // Değerler doğru geldi mi?
    screen.getAllByText(item[1]);
  });
});
