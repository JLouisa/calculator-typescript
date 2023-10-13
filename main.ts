const app = (() => {
  interface theCalculator {
    add(num1: number, num2: number): number;
    sub(num1: number, num2: number): number;
    divide(num1: number, num2: number): number;
    multiply(num1: number, num2: number): number;
    multiply(num1: number, num2: number): number;
    root(num1: number, num2: number): number;
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
    root(num1: number): number {
      const num2: number = 1;
      return Math.sqrt(num1 * num2);
    }
  }
  const calculator = new Calc();

  //! Create class history
  interface theHistory {
    historyNum1: number;
    methods: string;
    historyNum2: number;
  }

  class History implements theHistory {
    historyNum1: number;
    methods: string;
    historyNum2: number;
    result: number;

    constructor(historyNum1: number, methods: string, historyNum2: number, result: number) {
      this.historyNum1 = historyNum1;
      this.methods = methods;
      this.historyNum2 = historyNum2;
      this.result = result;
    }
  }

  //! History and input Arrays
  let inputArr: (number | string)[] = [];
  let calcMethod: string = "";
  let calcArr: (number | string)[] = [];
  let historyArr: History[] = [];
  let smallScreenArr: (number | string)[] = [];

  //! Falsy and Truthy
  let equalState = false;
  let numState = false;

  //! Caching DOM
  const buttonsEl: HTMLElement | null = document.querySelector(".buttonsLayout");
  const screenEl: HTMLElement | null = document.querySelector(".screen");
  const historyLayoutEl: HTMLElement | null = document.querySelector(".historyLayout");
  const historyWrapperEl: HTMLElement | null = document.querySelector(".historyWrapper");

  //! Create calculator layout
  // Screen layout
  const bigScreenEl: HTMLElement | null = document.createElement("div");
  bigScreenEl.classList.add("bigScreen");
  bigScreenEl.textContent = "0";
  const smallScreenEl: HTMLElement | null = document.createElement("div");
  smallScreenEl.textContent = "0";
  smallScreenEl.classList.add("smallScreen");
  screenEl?.appendChild(bigScreenEl);
  screenEl?.appendChild(smallScreenEl);

  // Button layout
  const contentArr: (number | string)[] = [
    "C",
    "CE",
    "⌫",
    "×",
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
      //! Add eventListener to numbers
      arr[i].addEventListener("click", () => {
        numState = true;
        if (equalState === false) {
          showSmallScreen(contentArr[i]);
          console.log(contentArr[i]);
          inputArr.push(contentArr[i]);
        }
        if (equalState === true) {
          inputArr = [];
          smallScreenArr = [];
          showSmallScreen(contentArr[i]);
          console.log(contentArr[i]);
          inputArr.push(contentArr[i]);
          equalState = false;
        }
      });
    }
    if (i === 3 || i === 7 || i === 11 || i === 15 || i === 18) {
      //! Add eventListener to methods
      arr[i].addEventListener("click", () => {
        if (numState) {
          if (inputArr.length === 0 && calcArr.length !== 0) {
            calcArr.pop();
            smallScreenArr.pop();
            showSmallScreen(` ${contentArr[i]} `);
            calcMethod = contentArr[i] as string;
            calcArr.push(calcMethod);
            console.log(contentArr[i]);
            console.log(calcArr);
          } else {
            console.log(contentArr[i]);
            showSmallScreen(` ${contentArr[i]} `);
            calcArr.push(Number(inputArr.join("")));
            calcArr.push(contentArr[i] as string);
            inputArr = [];
            console.log(calcArr);
            calcMethod = contentArr[i] as string;
            console.log(calcMethod);
          }
        }
      });
    }
  }

  // Equal
  arr[19].addEventListener("click", () => {
    equalState = true;
    calcArr.push(Number(inputArr.join("")));
    console.log(calcArr);
    calculation(calcArr[0] as number, calcMethod[0] as string, calcArr[2] as number);
  });
  // Clear
  arr[0].addEventListener("click", () => {
    inputArr = [];
    smallScreenArr = [];
    calcMethod = "";
    bigScreenEl.textContent = "0";
    console.log("cleared");
  });
  // Clear Everything
  arr[1].addEventListener("click", () => {
    inputArr = [];
    calcArr = [];
    smallScreenArr = [];
    calcMethod = "";
    equalState = false;
    numState = false;
    bigScreenEl.textContent = "0";
    smallScreenEl.textContent = "0";
    console.log("Cleared Everything");
  });
  // Delete
  arr[2].addEventListener("click", () => {
    inputArr.pop();
    showSmallScreenDel();
    console.log(inputArr);
  });

  //! Calculation Controller Module
  function calculation(num1: number, theMethod: string, num2: number): void {
    switch (theMethod) {
      case "+": {
        executeCalc(num1, num2, theMethod, calculator.add);
        break;
      }
      case "-": {
        executeCalc(num1, num2, theMethod, calculator.sub);
        break;
      }
      case "×": {
        executeCalc(num1, num2, theMethod, calculator.multiply);
        break;
      }
      case "÷": {
        executeCalc(num1, num2, theMethod, calculator.divide);
        break;
      }
      case "√": {
        executeCalc2(num1, theMethod, calculator.root);
        break;
      }
      default: {
        console.log("nothing");
        break;
      }
    }
  }
  function executeCalc(num1: number, num2: number, theMethod: string, func: Function) {
    const result = func(num1, num2);
    historyArr.push(new History(num1, theMethod, num2, result));
    bigScreenEl!.textContent = result.toString();
    calcArr = [];
    inputArr = result.toString().split(",");
    showHistory();
    console.log(historyArr);
  }
  function executeCalc2(num1: number, theMethod: string, func: Function) {
    const result = func(num1);
    historyArr.push(new History(num1, theMethod, 1, result));
    bigScreenEl!.textContent = result.toString();
    calcArr = [];
    inputArr = result.toString().split(",");
    showHistory();
    console.log(historyArr);
  }

  function showSmallScreen(element: number | string): void {
    smallScreenArr.push(element);
    smallScreenEl!.textContent = smallScreenArr.join("");
  }

  function showSmallScreenDel() {
    smallScreenArr.pop();
    if (smallScreenArr.length === 0) {
      smallScreenEl!.textContent = "0";
    }
    smallScreenEl!.textContent = smallScreenArr.join("");
  }

  function showHistory() {
    historyWrapperEl!.textContent = "";
    let x = 1;
    const num = historyArr.length - 5;
    for (let i = historyArr.length; i >= num; i--) {
      console.log("showHistory");
      if (historyArr[i]) {
        const mainSync = document.createElement("div");
        mainSync.classList.add("history", `histNum${i}`);
        mainSync.textContent = `${x++}.  ${historyArr[i].historyNum1} ${historyArr[i].methods} 
        ${historyArr[i].historyNum2} = ${historyArr[i].result}`;
        historyWrapperEl?.appendChild(mainSync);
      }
    }
  }
})();
