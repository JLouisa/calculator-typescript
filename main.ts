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
  const calculator: Calc = new Calc();

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
  let equalState: boolean = false;
  let numState: boolean = false;

  //! Route
  let route: number = 0;

  //! Caching DOM
  const buttonsEl: HTMLElement | null = document.querySelector(".buttonsLayout");
  const screenEl: HTMLElement | null = document.querySelector(".screen");
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
        if (route === 0 || route === 2) {
          router(contentArr[i], contentArr[i]);
        }
        if (route === 1) {
          route = 2;
          router(contentArr[i], contentArr[i]);
        }
        if (route === 3) {
          route = 0;
          resetSomethings();
          router(contentArr[i], contentArr[i]);
        }
        if (route === 4) {
          route = 2;
          resetSomethings();
          router(contentArr[i], contentArr[i]);
        }
      });
    }
    if (i === 3 || i === 7 || i === 11 || i === 15 || i === 18) {
      //! Add eventListener to methods
      arr[i].addEventListener("click", () => {
        if (route === 3) {
          router(contentArr[i], contentArr[i]);
        }
        if (route === 1 || route === 4) {
          calcMethod = contentArr[i] as string;
        }
        if (route === 0) {
          route = 1;
          router(contentArr[i], contentArr[i]);
        }
      });
    }
  }

  //! Route module
  function router(arg1: number | string, arg2: number | string) {
    switch (route) {
      case 0: {
        showSmallScreen(arg1);
        inputArr.push(arg2);
        break;
      }
      case 1: {
        showSmallScreen(` ${arg1} `);
        calcArr.push(Number(inputArr.join("")));
        inputArr = [];
        calcMethod = arg1 as string;
        break;
      }
      case 2: {
        showSmallScreen(arg1);
        inputArr.push(arg2);
        break;
      }
      case 3: {
        calcArr.push(Number(inputArr.join("")));
        smallScreenArr = [];
        smallScreenArr = [calcArr[0]];
        showSmallScreen(calcArr[0]);
        showSmallScreen(` ${arg1} `);
        // inputArr.push(arg2);
        route = 4;
        break;
      }
      case 4: {
        // calcArr.pop();
        smallScreenArr.pop();
        showSmallScreen(` ${arg1} `);
        // calcMethod = arg1 as string;
        // calcArr.push(calcMethod);
        break;
      }
    }
  }

  // Equal
  arr[19].addEventListener("click", () => {
    if (route === 2) {
      equalCalc();
      route = 3;
    }
  });
  function equalCalc() {
    calcArr.push(Number(inputArr.join("")));
    calculation(calcArr[0] as number, calcMethod, calcArr[1] as number);
  }
  // Clear
  arr[0].addEventListener("click", () => {
    resetEverything();
  });
  // Clear Everything
  arr[1].addEventListener("click", () => {
    resetEverything();
    historyArr = [];
    showHistory();
  });
  // Delete
  arr[2].addEventListener("click", () => {
    inputArr.pop();
    showSmallScreenDel();
  });

  function resetSomethings(): void {
    inputArr = [];
    calcArr = [];
    smallScreenArr = [];
    calcMethod = "";
  }

  function resetEverything(): void {
    inputArr = [];
    calcArr = [];
    smallScreenArr = [];
    calcMethod = "";
    equalState = false;
    numState = false;
    bigScreenEl!.textContent = "0";
    smallScreenEl!.textContent = "0";
  }

  //! Calculation Controller Module
  function calculation(num1: number, theMethod: string, num2: number): void {
    console.log("num1");
    console.log(num1);
    console.log("theMethod");
    console.log(theMethod);
    console.log("num2");
    console.log(num2);
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
    }
  }
  function executeCalc(num1: number, num2: number, theMethod: string, func: Function): void {
    const result = func(num1, num2);
    historyArr.push(new History(num1, theMethod, num2, result));
    bigScreenEl!.textContent = result.toString();
    calcArr = [];
    inputArr = result.toString().split(",");
    showHistory();
    route = 2;
  }
  function executeCalc2(num1: number, theMethod: string, func: Function): void {
    const result = func(num1);
    historyArr.push(new History(num1, theMethod, 1, result));
    bigScreenEl!.textContent = result.toString();
    calcArr = [];
    inputArr = result.toString().split(",");
    showHistory();
  }

  //! Small Screen Display
  function showSmallScreen(element: number | string): void {
    smallScreenArr.push(element);
    smallScreenEl!.textContent = smallScreenArr.join("");
  }
  function showSmallScreenDel(): void {
    smallScreenArr.pop();
    smallScreenEl!.textContent = smallScreenArr.join("");
    if (smallScreenArr.length === 0) {
      smallScreenEl!.textContent = "0";
    }
  }

  function showHistory(): void {
    historyWrapperEl!.textContent = "";
    let x = 1;
    const num = historyArr.length - 5;
    for (let i = historyArr.length; i >= num; i--) {
      if (historyArr[i]) {
        if (historyArr[i].methods === "√") {
          createHTML(1, historyArr[i], x++, i);
        } else {
          createHTML(2, historyArr[i], x++, i);
        }
      }
    }
  }

  function createHTML(num: number, obj: History, x: number, i: number): void {
    const mainSync = document.createElement("div");
    mainSync.addEventListener("click", () => {
      reUseCalc(obj, i);
    });
    const mainNumSpanEl = document.createElement("span");
    const mainCalcEl = document.createElement("span");
    mainNumSpanEl.classList.add("historySpan");
    mainCalcEl.classList.add("historyCalc");
    mainSync.classList.add("history", `histNum${i}`);
    mainNumSpanEl.textContent = `${x++}.  `;
    mainSync?.appendChild(mainNumSpanEl);
    mainSync?.appendChild(mainCalcEl);
    historyWrapperEl?.appendChild(mainSync);
    switch (num) {
      case 1: {
        mainCalcEl.textContent = `${obj.methods}(${obj.historyNum1}) = ${obj.result}`;
        break;
      }
      case 2: {
        mainCalcEl.textContent = `${obj.historyNum1} ${obj.methods} 
            ${obj.historyNum2} = ${obj.result}`;
        break;
      }
    }
  }

  function reUseCalc(obj: History, i: number): void {
    resetEverything();
    equalState = true;
    historyArr.splice(i, 1);
    calculation(obj.historyNum1, obj.methods, obj.historyNum2);
    showSmallScreen(`${obj.historyNum1} ${obj.methods} ${obj.historyNum2}`);
  }
})();
