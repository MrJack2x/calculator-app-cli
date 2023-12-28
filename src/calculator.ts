// Calculator CLI Tool
import * as readline from "readline";

interface CalculateParameters {
  operation: string;
  num1: number;
  num2: number;
}

function calculate({
  operation,
  num1,
  num2,
}: CalculateParameters): number | string {
  if (operation === "/" && num2 === 0) {
    return "Can't divide by 0!";
  }

  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return "Error: Invalid operation provided.";
  }
}

function isValidNumber(numStr: string) {
  if (isNaN(parseFloat(numStr))) {
    console.log("Error: The number provided is not a valid number.");
    startCalculator();
  }
}

function isValidOperation(operation: string) {
  if (!["+", "-", "*", "/"].includes(operation.trim())) {
    console.log("Error: Invalid operation provided.");
    startCalculator();
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function redoCalculation() {
  rl.question(
    "Would you like to perform another calculation? (y/n): ",
    (ans) => {
      if (ans === "y" || ans === "Y") {
        startCalculator();
      } else {
        console.log("Goodbye!");
        rl.close();
      }
    },
  );
}

function startCalculator() {
  rl.question("Please enter an operation (+, -, *, /): ", (operation) => {
    isValidOperation(operation);
    rl.question("Please enter the first number: ", (num1Str) => {
      isValidNumber(num1Str);
      rl.question("Please enter the second number: ", (num2Str) => {
        isValidNumber(num2Str);

        const num1: number = parseFloat(num1Str);
        const num2: number = parseFloat(num2Str);

        const result = calculate({ operation, num1, num2 });
        console.log(`The result is: ${result}`);

        redoCalculation();
      });
    });
  });
}

startCalculator();
