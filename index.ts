#! /usr/bin/env node

import inquirer from "inquirer";

const randomNumber: number = Math.floor(100000 + Math.random() * 90000);

let myBalance: number = 0;

let answer = await inquirer.prompt([
  {
    name: "student",
    type: "input",
    message: "Enter student name :",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please enter your non-empty";
    },
  },
  {
    name: "courses",
    type: "list",
    message: "Select the course to enrolled :",
    choices: ["Fashion Design", "Cooking", "Event Management", "English"],
  },
]);

const tutionFee: { [key: string]: number } = {
  "Fashion Design": 5000,
  Cooking: 3000,
  "Event Management": 10000,
  English: 4000,
};

console.log(`\n Tution fee : ${tutionFee[answer.courses]}/ -\n`);
console.log(`Balance : ${myBalance}\n`);

let paymentType = await inquirer.prompt([
  {
    name: "payment",
    type: "list",
    message: "Select the payment method :",
    choices: ["Cash", "Card"],
  },
  {
    name: "amount",
    type: "input",
    message: "Transfer Money:",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please enter your non-empty";
    },
  },
]);

console.log(`\nYou select payment method ${paymentType.payment}\n`);

const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);

if (tutionFees === paymentAmount) {
  console.log(
    `\n Congratulations! you have succesfully enrolled in ${answer.courses}\n`
  );

  let ans = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: "What would you like to do next?",
      choices: ["View Status", "Exit"],
    },
  ]);
  if (ans.select === "View Status") {
    console.log(`Student Name: ${answer.student}`);
    console.log(`Student ID: ${randomNumber}`);
    console.log(`Course : ${answer.courses}`);
    console.log(`Tution Fees Paid : ${paymentAmount}`);
    console.log(`Balance : ${(myBalance += paymentAmount)}`);
  } else {
    console.log("Existing Student Management System");
  }
} else {
  console.log(`Invalid amount due to course\n`);
}
