const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tips = document.querySelectorAll(".tips");
const tipPerPerson = document.getElementById("tip-amount");
const totalPerPerson = document.getElementById("total-amount");
const resetBtn = document.querySelector(".reset");
const tipCustom = document.querySelector(".tip-custom");
const error = document.querySelector(".error");
const billAmount = document.getElementById("total-bill");

billInput.addEventListener("input", billInputFun);
peopleInput.addEventListener("input", peopleInputFun);
tips.forEach(function (val) {
  val.addEventListener("click", handleClick);
});
resetBtn.addEventListener("click", reset);
tipCustom.addEventListener("input", tipInputFun);

billInput.value = "0";
peopleInput.value = "1";
tipPerPerson.innerHTML = "&#x20b9;" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "&#x20b9;" + (0.0).toFixed(2);
billAmount.innerHTML = "&#x20b9;" + (0.0).toFixed(2);

let billValue = 0;
let peopleValue = 1;
let tipValue = 0.15;

function billInputFun() {
  billValue = parseFloat(billInput.value);
  calculateTip();
}

function tipInputFun() {
  tipValue = parseFloat(tipCustom.value / 100);

  tips.forEach(function (val) {
    val.classList.remove("active-tip");
  });
  calculateTip();
}

function peopleInputFun() {
  peopleValue = parseFloat(peopleInput.value);

  if (peopleValue < 1) {
    error.style.display = "flex";
    peopleInput.style.border = "thick solid red";
  } else {
    error.style.display = "none";
    peopleInput.style.border = "none";
    calculateTip();
  }
}

function handleClick(event) {
  tips.forEach(function (val) {
    val.classList.remove("active-tip");
    if (event.target.innerHTML == val.innerHTML) {
      val.classList.add("active-tip");
      tipValue = parseFloat(val.innerHTML) / 100;
    }
  });
  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue);
    let total = (billValue + tipAmount) / peopleValue;
    let totalBill = (billValue + tipAmount);
    tipPerPerson.innerHTML = "&#x20b9;" + tipAmount.toFixed(2);
    totalPerPerson.innerHTML = "&#x20b9;" + total.toFixed(2);
    billAmount.innerHTML = "&#x20b9;" + totalBill.toFixed(2);
  }
} 

function reset() {
  billInput.value = "0.0";
  billInputFun();
  peopleInput.value = "1";
  peopleInputFun();
  tipCustom.value = "";
}