const app = (() => {
  interface theCalculator {
    add(num1: number, num2: number): number;
    sub(num1: number, num2: number): number;
    divide(num1: number, num2: number): number;
    multiply(num1: number, num2: number): number;
  }

  //! Calculator class
  class Calc implements theCalculator {
    add(num1: number, num2: number): number {
      return num1 + num2;
    }
    sub(num1: number, num2: number): number {
      return num1 - num2;
    }
    divide(num1: number, num2: number): number {
      return num1 / num2;
    }
    multiply(num1: number, num2: number): number {
      return num1 * num2;
    }
  }
  const calculator = new Calc();

  //! History Arrays
  let inputArr: (number | string)[] = [];
  let calcArr: (number | string)[] = [];

  //! Caching DOM
  const buttonsEl: HTMLElement | null = document.querySelector(".buttonsLayout");
  const screenEl: HTMLElement | null = document.querySelector(".screen");

  //! Create calculator layout
  // Screen layout
  const bigScreenEl: HTMLElement | null = document.createElement("div");
  bigScreenEl.classList.add("bigScreen");
  bigScreenEl.textContent = "0";
  const smallScreenEl: HTMLElement | null = document.createElement("div");
  smallScreenEl.textContent = "1";
  smallScreenEl.classList.add("smallScreen");
  screenEl?.appendChild(bigScreenEl);
  screenEl?.appendChild(smallScreenEl);

  // Button layout
  const contentArr: (number | string)[] = [
    "C",
    "CE",
    "⌫",
    "X",
    7,
    8,
    9,
    "÷",
    4,
    5,
    6,
    "+",
    1,
    2,
    3,
    "-",
    ".",
    0,
    "√",
    "=",
  ];
  let arr: HTMLElement[] = [];
  for (let i = 0; i < 20; i++) {
    arr[i] = document.createElement("div");
    arr[i]?.classList.add(`buttons`, `btn${[i]}`);
    arr[i].textContent = `${contentArr[i]}`;
    buttonsEl?.appendChild(arr[i]);
    if (
      i === 4 ||
      i === 5 ||
      i === 6 ||
      i === 8 ||
      i === 9 ||
      i === 10 ||
      i === 12 ||
      i === 13 ||
      i === 14 ||
      i === 16 ||
      i === 17
    ) {
      //! Add eventListener
      arr[i].addEventListener("click", function () {
        console.log(contentArr[i]);
        inputArr.push(contentArr[i]);
        console.log(inputArr);
      });
    }
  }
  arr[11].addEventListener("click", () => {
    console.log(contentArr[11], "testing");
    calcArr.push(inputArr.join(""));
    calcArr.push(contentArr[11]);
    inputArr = [];
    console.log(calcArr);
  });
})();
