const app = (() => {
  interface theCalculator {
    add(num1: number, num2: number): number;
    sub(num1: number, num2: number): number;
    divide(num1: number, num2: number): number;
    multiply(num1: number, num2: number): number;
  }

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
})();
