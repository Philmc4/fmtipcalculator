const totalAmount = document.getElementById("total-bill-input");
const totalPeople = document.getElementById("total-people-input");
const customAmount = document.getElementById("custom-input");
const tipAmount = document.getElementById("tip-amount");
const perPersonAmount = document.getElementById("total-per-person");
const resetBtn = document.getElementById("resetBtn");
const buttons = document.querySelectorAll(".btn-1");
const errorMessage = document.getElementById("error-message");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".btn-1-active")?.classList.remove("btn-1-active");
    button.classList.add("btn-1-active");
    let tipvalue = e.target.innerText;
    tipvalue = tipvalue.replace("%", "");

    if (totalAmount.value === "") return;
    if (!totalPeople.value || totalPeople.value === "0") {
      errorMessage.classList.remove("hidden");
      totalPeople.classList.add("error-border");
    } else {
      errorMessage.classList.add("hidden");
      totalPeople.classList.remove("error-border");
    }

    calculateTip(
      parseFloat(totalAmount.value),
      parseFloat(tipvalue),
      parseFloat(totalPeople.value)
    );
  });
});

customAmount.addEventListener("click", (e) => {
  document.querySelector(".btn-1-active")?.classList.remove("btn-1-active");
});

customAmount.addEventListener("blur", (e) => {
  if (totalAmount.value === "") {
    resetEverything();
    return;
  }

  calculateTip(
    parseFloat(totalAmount.value),
    parseFloat(e.target.value),
    parseFloat(totalPeople.value)
  );
});

function calculateTip(totalAmount, tipPercentage, totalPeople) {
  let tiptotal = (totalAmount * (tipPercentage / 100)) / totalPeople;
  let tip = Math.floor(tiptotal * 100) / 100;
  tip = tip.toFixed(2);

  let FinalSum = (tiptotal * totalPeople + totalAmount) / totalPeople;
  FinalSum = FinalSum.toFixed(2);

  // tipAmount.innerHTML = `$${tip}`;
  perPersonAmount.innerHTML = `$${FinalSum}`;
  tipAmount.innerHTML = `$${tip}`;
}

resetBtn.addEventListener("click", resetEverything);
function resetEverything() {
  tipAmount.innerHTML = "$0.00";
  perPersonAmount.innerHTML = "$0.00";
  totalAmount.value = "";
  totalPeople.value = "";
  customAmount.value = "";
  errorMessage.classList.add("hidden");
  totalPeople.classList.remove("error-border");
}
