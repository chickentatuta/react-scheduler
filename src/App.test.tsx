import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("初期表示", () => {
  test("「40:00」が描画されていること", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("timeLeft").textContent).toEqual("40:00");
  });
  test("「開始」が描画されていること", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("timerButton").textContent).toEqual("開始");
  });
  test("「作業」が描画されていること", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("timerMode").textContent).toEqual("作業");
  });
});

describe("開始ボタンを押した際の表示のテスト", () => {
  test("「40:00」が描画されていること", () => {
    const { getByTestId } = render(<App />);
    userEvent.click(getByTestId("timerButton"));
    expect(getByTestId("timeLeft").textContent).toEqual("40:00");
  });
  test("「作業」が描画されていること", () => {
    const { getByTestId } = render(<App />);
    userEvent.click(getByTestId("timerButton"));
    expect(getByTestId("timerMode").textContent).toEqual("作業");
  });
});

describe("停止ボタンを押した後の表示のテスト", () => {
  describe("開始ボタンを押してから2秒後に停止ボタンを押した後の表示のテスト", () => {
    test("「40:00」と描画されていること", async () => {
      vi.useFakeTimers();
      const { getByTestId } = render(<App />);
      userEvent.click(getByTestId("timerButton"));
      act(() => {
        vi.advanceTimersByTime(2 * 1000);
      });
      userEvent.click(getByTestId("timerButton"));
      expect(getByTestId("timeLeft").textContent).toEqual("40:00");
    });
    test("「作業」と描画されていること", async () => {
      vi.useFakeTimers();
      const { getByTestId } = render(<App />);
      userEvent.click(getByTestId("timerButton"));
      act(() => {
        vi.advanceTimersByTime(2 * 1000);
      });
      userEvent.click(getByTestId("timerButton"));
      expect(getByTestId("timerMode").textContent).toEqual("作業");
    });
    test("停止してから1秒後に「40:00」と描画されていること", () => {
      vi.useFakeTimers();
      const { getByTestId } = render(<App />);
      userEvent.click(getByTestId("timerButton"));
      act(() => {
        vi.advanceTimersByTime(2 * 1000);
      });
      userEvent.click(getByTestId("timerButton"));
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(getByTestId("timeLeft").textContent).toEqual("40:00");
    });
  });
  describe("開始ボタンを押してから40分+2秒後に停止ボタンを押した後の表示のテスト", () => {
    test("「40:00」と描画されていること", async () => {
      vi.useFakeTimers();
      const { getByTestId } = render(<App />);
      userEvent.click(getByTestId("timerButton"));
      act(() => {
        vi.advanceTimersByTime((40 * 60 + 2) * 1000);
      });
      userEvent.click(getByTestId("timerButton"));
      expect(getByTestId("timeLeft").textContent).toEqual("40:00");
    });
    test("「作業」と描画されていること", async () => {
      vi.useFakeTimers();
      const { getByTestId } = render(<App />);
      userEvent.click(getByTestId("timerButton"));
      act(() => {
        vi.advanceTimersByTime((40 * 60 + 2) * 1000);
      });
      userEvent.click(getByTestId("timerButton"));
      expect(getByTestId("timerMode").textContent).toEqual("作業");
    });
    test("停止してから1秒後に「40:00」と描画されていること", () => {
      vi.useFakeTimers();
      const { getByTestId } = render(<App />);
      userEvent.click(getByTestId("timerButton"));
      act(() => {
        vi.advanceTimersByTime((40 * 60 + 2) * 1000);
      });
      userEvent.click(getByTestId("timerButton"));
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(getByTestId("timeLeft").textContent).toEqual("40:00");
    });
  });
});