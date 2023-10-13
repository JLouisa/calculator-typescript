"use strict";
const app = (() => {
    var _a;
    //! Calculator class
    class Calc {
        add(num1, num2) {
            return num1 + num2;
        }
        sub(num1, num2) {
            return num1 - num2;
        }
        divide(num1, num2) {
            return num1 / num2;
        }
        multiply(num1, num2) {
            return num1 * num2;
        }
        root(num1) {
            const num2 = 1;
            return Math.sqrt(num1 * num2);
        }
    }
    const calculator = new Calc();
    class History {
        constructor(historyNum1, methods, historyNum2, result) {
            this.historyNum1 = historyNum1;
            this.methods = ` ${methods} `;
            this.historyNum2 = historyNum2;
            this.result = result;
        }
    }
    class History2 {
        constructor(historyNum1, methods, result) {
            this.historyNum1 = historyNum1;
            this.methods = methods;
            this.result = result;
        }
    }
    //! History and input Arrays
    let inputArr = [];
    let calcMethod = "";
    let calcArr = [];
    let historyArr = [];
    let smallScreenArr = [];
    //! Falsy and Truthy
    let equalState = false;
    let numState = false;
    //! Caching DOM
    const buttonsEl = document.querySelector(".buttonsLayout");
    const screenEl = document.querySelector(".screen");
    //! Create calculator layout
    // Screen layout
    const bigScreenEl = document.createElement("div");
    bigScreenEl.classList.add("bigScreen");
    bigScreenEl.textContent = "0";
    const smallScreenEl = document.createElement("div");
    smallScreenEl.textContent = "0";
    smallScreenEl.classList.add("smallScreen");
    screenEl === null || screenEl === void 0 ? void 0 : screenEl.appendChild(bigScreenEl);
    screenEl === null || screenEl === void 0 ? void 0 : screenEl.appendChild(smallScreenEl);
    // Button layout
    const contentArr = [
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
    let arr = [];
    for (let i = 0; i < 20; i++) {
        arr[i] = document.createElement("div");
        (_a = arr[i]) === null || _a === void 0 ? void 0 : _a.classList.add(`buttons`, `btn${[i]}`);
        arr[i].textContent = `${contentArr[i]}`;
        buttonsEl === null || buttonsEl === void 0 ? void 0 : buttonsEl.appendChild(arr[i]);
        if (i === 4 ||
            i === 5 ||
            i === 6 ||
            i === 8 ||
            i === 9 ||
            i === 10 ||
            i === 12 ||
            i === 13 ||
            i === 14 ||
            i === 16 ||
            i === 17) {
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
                    //   smallScreenArr = [];
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
                        calcMethod = contentArr[i];
                        calcArr.push(calcMethod);
                        console.log(contentArr[i]);
                        console.log(calcArr);
                    }
                    else {
                        console.log(contentArr[i]);
                        showSmallScreen(` ${contentArr[i]} `);
                        calcArr.push(Number(inputArr.join("")));
                        calcArr.push(contentArr[i]);
                        inputArr = [];
                        console.log(calcArr);
                        calcMethod = contentArr[i];
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
        calculation(calcArr[0], calcMethod[0], calcArr[2]);
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
    function calculation(num1, theMethod, num2) {
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
    function executeCalc(num1, num2, theMethod, func) {
        const result = func(num1, num2);
        historyArr.push(new History(num1, theMethod, num2, result));
        bigScreenEl.textContent = result.toString();
        calcArr = [];
        inputArr = result.toString().split(",");
        console.log(historyArr);
    }
    function executeCalc2(num1, theMethod, func) {
        const result = func(num1);
        historyArr.push(new History2(num1, theMethod, result));
        bigScreenEl.textContent = result.toString();
        calcArr = [];
        inputArr = result.toString().split(",");
        console.log(historyArr);
    }
    function showSmallScreen(element) {
        smallScreenArr.push(element);
        smallScreenEl.textContent = smallScreenArr.join("");
    }
    function showSmallScreenDel() {
        smallScreenArr.pop();
        if (smallScreenArr.length === 0) {
            smallScreenArr[0] = 0;
        }
        smallScreenEl.textContent = smallScreenArr.join("");
    }
})();
