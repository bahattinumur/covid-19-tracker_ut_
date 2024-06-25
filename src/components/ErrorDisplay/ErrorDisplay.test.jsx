import { render, screen } from "@testing-library/react";
import ErrorDisplay from ".";
import userEvent from "@testing-library/user-event";

describe("error display bileşeni", () => {
  beforeEach(() => {
    //console.log('TESTİN ÇALIŞMASINDAN HEMEN ÖNCE');
  });

  beforeAll(() => {
    // console.log('TESTİN ÇALIŞMASINDAN HEMEN SONRA');
  });

  test("doğru mesajı gösterir", () => {
    const errorMessage = "404 content was not found";
    render(<ErrorDisplay message={errorMessage} retry={() => {}} />);

    // Doğru hata mesajına sahip yazı var mı?
    screen.getByText(errorMessage);

    // expect(item).toBeInTheDocument();
  });

  test("tekrar dene butonuna basınca fonksiton çalılışır", async () => {
    // User'ı kur
    const user = userEvent.setup();

    // Bir test / Mock fonksiyonu oluştur
    const retryMock = jest.fn();

    // Bileşeni renderla
    render(<ErrorDisplay message={"xx"} retry={retryMock} />);

    // Butonu çağır
    const button = screen.getByRole("button");

    // Butona tıkla
    await user.click(button);

    // Fonksiyon çağrıldı mı kontrol et?
    expect(retryMock).toHaveBeenCalled();
  });
});
