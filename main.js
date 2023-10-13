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
    }
    const calculator = new Calc();
    //! History Arrays
    let inputArr = [];
    let calcArr = [];
    //! Caching DOM
    const buttonsEl = document.querySelector(".buttonsLayout");
    const screenEl = document.querySelector(".screen");
    //! Create calculator layout
    // Screen layout
    const bigScreenEl = document.createElement("div");
    bigScreenEl.classList.add("bigScreen");
    bigScreenEl.textContent = "0";
    const smallScreenEl = document.createElement("div");
    smallScreenEl.textContent = "1";
    smallScreenEl.classList.add("smallScreen");
    screenEl === null || screenEl === void 0 ? void 0 : screenEl.appendChild(bigScreenEl);
    screenEl === null || screenEl === void 0 ? void 0 : screenEl.appendChild(smallScreenEl);
    // Button layout
    const contentArr = [
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
