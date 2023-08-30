import { useState } from "react";

import "./App.css";

function App() {
  let [display, setDisplay] = useState("0");
  let [history, setHistory] = useState("");
  const sign = ["/", "X", "+", "-", "*"];
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

  const changeDisplay = (e) => {
    let currentDisplay;
    let currentHistory = "";

    currentDisplay =
      (display === 0 || display === "NaN" ? "" : display) +
      e.target.textContent;

    if (e.target.textContent === "." && currentDisplay.split(".").length > 2) {
      return;
    }
    if (e.target.textContent === ".") {
      if (display === 0) {
        currentDisplay = display + e.target.textContent;
        currentHistory = "0" + e.target.textContent;
      } else if (sign.includes(history[history.length - 1])) {
        currentDisplay = "0" + e.target.textContent;
        currentHistory = history + "0" + e.target.textContent;
      } else {
        currentDisplay = display + e.target.textContent;
        currentHistory = history + e.target.textContent;
      }
    }

    if (display === 0 && e.target.textContent === "=") {
      currentDisplay = "NaN";
      currentHistory = "=NaN";
    }

    if (sign.includes(e.target.textContent)) {
      currentDisplay = e.target.textContent;
      if (e.target.textContent !== "-") {
        if (
          history.length &&
          sign.includes(history[history.length - 1]) &&
          !sign.includes(history[history.length - 2]) &&
          !history.endsWith("--")
        ) {
          currentHistory =
            history.slice(0, history.length - 1) +
            (e.target.textContent === "X" ? "*" : e.target.textContent);
          console.log(history, "введен НЕ МИНУС, в конце НЕ 2 минуса");
        } else if (
          (history.length &&
            history.endsWith("--") &&
            sign.includes(history[history.length - 1])) ||
          (sign.includes(history[history.length - 1]) &&
            sign.includes(history[history.length - 2]))
        ) {
          currentHistory =
            history.slice(0, history.length - 2) +
            (e.target.textContent === "X" ? "*" : e.target.textContent);
          console.log("введен НЕ МИНУС, в конце 2 минуса");
        } else {
          currentHistory =
            history +
            (e.target.textContent === "X" ? "*" : e.target.textContent);
          console.log(history, "else");
        }
      }
      if (e.target.textContent === "-") {
        if (
          !history.endsWith("--") &&
          sign.includes(history[history.length - 1]) &&
          history[history.length - 1] !== e.target.textContent
        ) {
          currentHistory = history + e.target.textContent;
          console.log(history, "введен МИНУС, в конце НЕ минус");
        } else if (
          !history.endsWith("--") &&
          history[history.length - 1] === e.target.textContent &&
          history[history.length - 2] !== e.target.textContent
        ) {
          currentHistory =
            history.slice(0, history.length - 1) + e.target.textContent;
          console.log("введен МИНУС, в конце минус, а перед ним НЕ минус");
        } else if (numbers.includes(history[history.length - 1])) {
          currentHistory = history + e.target.textContent;
          console.log("введен МИНУС, в конце число");
        } else {
          currentHistory = history;
          console.log("введен МИНУС, в конце 2 минуса");
        }
      }
    }

    if (numbers.includes(e.target.textContent) && !history.includes("=")) {
      if (e.target.textContent !== ".") {
        currentHistory = history + e.target.textContent;
        if (e.target.textContent === "0" && display[0] === "0") {
          currentDisplay = e.target.textContent;
          currentHistory = history;
        }
        if (e.target.textContent !== "0" && display === "0") {
          currentDisplay = "" + e.target.textContent;
          currentHistory = history.slice(0, -1) + e.target.textContent;
          // console.log(display);
        }
        // console.log(display, "равно нет в истории");
      }
      if (e.target.textContent === "0" && display.includes(".")) {
        currentDisplay = display + e.target.textContent;
        currentHistory = history + e.target.textContent;
      }
    } else if (
      numbers.includes(e.target.textContent) &&
      history.includes("=")
    ) {
      // console.log('после равно')
      currentDisplay = "" + e.target.textContent;
      currentHistory = e.target.textContent;
    }

    if (sign.includes(display) && numbers.includes(e.target.textContent)) {
      currentDisplay =
        (e.target.textContent === "." ? "0" : "") + e.target.textContent;
      currentHistory =
        history +
        (e.target.textContent === "." ? "0" : "") +
        e.target.textContent;
      // console.log(display, history)
    }
    if (history.includes("=") && sign.includes(e.target.textContent)) {
      currentHistory =
        display + (e.target.textContent === "X" ? "*" : e.target.textContent);
    }

    setTimeout(() => {
      setDisplay(currentDisplay);
      setHistory(currentHistory);
    }, 0);
  };

  function calculate() {
    setTimeout(() => {
      // let fixHistory = history.replace(/\-{2}/g, '+')
      setDisplay(eval(history));
      setHistory(history + "=" + eval(history));
      console.log(history);
    }, 0);
  }

  return (
    <div className="wrapper">
      <div className="btn display">
        <div className="history">{history}</div>
        <div id="display">{display}</div>
      </div>
      <div
        className="btn clear"
        id="clear"
        onClick={() => {
          setDisplay("0");
          setHistory("");
        }}
      >
        AC
      </div>
      <div className="btn sign" id="divide" onClick={changeDisplay}>
        /
      </div>
      <div className="btn sign" id="multiply" onClick={changeDisplay}>
        X
      </div>
      <div className="btn numbers" id="seven" onClick={changeDisplay}>
        7
      </div>
      <div className="btn numbers" id="eight" onClick={changeDisplay}>
        8
      </div>
      <div className="btn numbers" id="nine" onClick={changeDisplay}>
        9
      </div>
      <div className="btn sign" id="subtract" onClick={changeDisplay}>
        -
      </div>
      <div className="btn numbers" id="four" onClick={changeDisplay}>
        4
      </div>
      <div className="btn numbers" id="five" onClick={changeDisplay}>
        5
      </div>
      <div className="btn numbers" id="six" onClick={changeDisplay}>
        6
      </div>
      <div className="btn sign" id="add" onClick={changeDisplay}>
        +
      </div>
      <div className="btn numbers" id="one" onClick={changeDisplay}>
        1
      </div>
      <div className="btn numbers" id="two" onClick={changeDisplay}>
        2
      </div>
      <div className="btn numbers" id="three" onClick={changeDisplay}>
        3
      </div>
      <div
        className="btn equal"
        id="equals"
        onClick={(e) => {
          changeDisplay(e);
          calculate(e);
        }}
      >
        =
      </div>
      <div className="btn numbers zero" id="zero" onClick={changeDisplay}>
        0
      </div>
      <div className="btn numbers" id="decimal" onClick={changeDisplay}>
        .
      </div>
    </div>
  );
}

export default App;
