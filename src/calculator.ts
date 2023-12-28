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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function startCalculator() {
  rl.question("Please enter an operation (+, -, *, /): ", (operation) => {
    if (!["+", "-", "*", "/"].includes(operation.trim())) {
      console.log("Error: Invalid operation provided.");
      startCalculator();
      return;
    }
    rl.question("Please enter the first number: ", (num1Str) => {
      if (isNaN(parseFloat(num1Str))) {
        console.log("Error: The first number provided is not a valid number.");
        rl.close();
        return;
      }
      rl.question("Please enter the second number: ", (num2Str) => {
        if (isNaN(parseFloat(num2Str))) {
          console.log(
            "Error: The second number provided is not a valid number."
          );
          rl.close();
          return;
        }

        const num1: number = parseFloat(num1Str);
        const num2: number = parseFloat(num2Str);

        const result = calculate({ operation, num1, num2 });
        console.log(`The result is: ${result}`);

        rl.question(
          "Would you like to perform another calculation? (y/n): ",
          (ans) => {
            if (ans === "y" || ans === "Y") {
              startCalculator();
            } else {
              console.log("Goodbye!");
              rl.close();
            }
          }
        );
      });
    });
  });
}

startCalculator();
