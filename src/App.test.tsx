import { render, screen } from "@testing-library/react";
import App from "./App";

describe("初期表示", () => {
    test("「40:00」が描画されている", async () => {
        render(<App />);
        const linkElement = screen.getByText("40:00");
        expect(linkElement).toBeInTheDocument();
    });

    test("「開始」ボタンが描画されている", async () => {
        render(<App />);
        const linkElement = screen.getByText("開始");
        expect(linkElement).toBeInTheDocument();
    });

    test("「作業」が描画されている", async () => {
        render(<App />);
        const linkElement = screen.getByText("作業");
        expect(linkElement).toBeInTheDocument();
    });
});
