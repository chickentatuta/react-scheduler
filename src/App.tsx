import { useEffect, useState } from "react";

/** タイマーの長さ */
const TIMER_LENGTH = { work: 40 * 60, break: 20 * 60 } as const;
type TIMER_LENGTH = typeof TIMER_LENGTH[keyof typeof TIMER_LENGTH];

/** タイマーモード */
type TimerMode = "work" | "break";

interface State {
  timeLeft: number;
  isTimerOn: boolean;
  timerMode: TimerMode;
}

/** タイマーのカウントのsetIntervalのID */
let timerCountInterval = 0;

/**
 * 秒の数値をMM:SS形式の文字列に変換します。
 * @param {number} second 秒
 * @returns MM:SS形式の文字列
 */
const secondToMMSS = (second: number) => {
  const MM =
    second >= 10 * 60
      ? Math.floor(second / 60).toString()
      : second >= 1 * 60
      ? "0" + Math.floor(second / 60).toString()
      : "00";
  const SS = second % 60 >= 10 ? second % 60 : "0" + (second % 60);
  return MM + ":" + SS;
};

const App = () => {
  const [state, setState] = useState<State>({
    timeLeft: TIMER_LENGTH.work,
    isTimerOn: false,
    timerMode: "work",
  });

  useEffect(() => {
    return () => {
      clearInterval(timerCountInterval);
    };
  }, []);

  const onButtonClick = () => {
    setState((state) => {
      clearInterval(timerCountInterval);
      if (state.isTimerOn) {
        return {
          ...state,
          timeLeft: TIMER_LENGTH.work,
          timerMode: "work",
          isTimerOn: false,
        };
      }
      timerCountInterval = window.setInterval(() => {
        timerCount();
      }, 1000);
      return { ...state, isTimerOn: true };
    });
  };

  const timerCount = () => {
    setState((state) => {
      if (state.timeLeft <= 0) {
        state = toggleTimerMode(state);
      }
      return { ...state, timeLeft: state.timeLeft - 1 };
    });
  };

  const toggleTimerMode = (state: State): State => {
    const timeLeft =
      state.timerMode === "work" ? TIMER_LENGTH.break : TIMER_LENGTH.work;
    const timerMode = state.timerMode === "work" ? "break" : "work";
    return {
      ...state,
      timeLeft: timeLeft,
      timerMode: timerMode,
    };
  };

  return (
    <>
      <div className="bg-green-200 font-body px-3">
        <h1 className=" text-4xl text-green-600 py-2">Let's flow time !</h1>
      </div>
      <div className="m-10 mt-20 font-body font-bold text-center text-9xl" data-testid="timeLeft">
        {secondToMMSS(state.timeLeft)}
      </div>
      <div className="text-center w-full" >
        <button className="bg-gray-500 hover:bg-gray-400 text-3xl text-white rounded px-20 py-3" data-testid="timerButton" onClick={onButtonClick}>
          {state.isTimerOn ? "stop" : "start"}
        </button>        
      </div>
      <div className="font-body m-20 text-6xl text-center" data-testid="timerMode">
        {state.timerMode === "work" ? "work!" : "coffee break"}
      </div>
    </>
  );
};

export default App;
