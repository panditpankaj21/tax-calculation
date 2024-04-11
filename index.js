const taxCalculationForm = document.getElementById("myForm");
const resultContainer = document.getElementById("result-container");
const closeButton = document.getElementById("close-btn");
const errAnnualIncome = document.getElementById("err-annual-income");
const errExtraIncome = document.getElementById("err-extra-income");
const errTotalDeductions = document.getElementById("err-total-deductions");
const errAgeGroup = document.getElementById('err-age-group');
const taxResult = document.getElementById("tax-result");

taxCalculationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const annualIncome = document.getElementById("annual_income").value;
  const extraIncome = document.getElementById("extra_income").value;
  const ageGroup = document.getElementById("age_group").value;
  const totalDeductions = document.getElementById("total_deductions").value;

    if(!isOnlyNumbers(annualIncome)){
        errAnnualIncome.style.visibility = "visible";
        return;
    }else{
        errAnnualIncome.style.visibility = "hidden";
    }

    if(!isOnlyNumbers(extraIncome)){
        errExtraIncome.style.visibility = "visible";
        return;
    }else{
        errExtraIncome.style.visibility = "hidden";
    }

    if(!ageGroup){
        errAgeGroup.style.visibility = "visible";
        return;
    }else{
        errAgeGroup.style.visibility = "hidden";
    }

    if(!isOnlyNumbers(totalDeductions)){
        errTotalDeductions.style.visibility = "visible";
        return;
    }else{
        errTotalDeductions.style.visibility = "hidden";
    }

    const annualIncomeInt = parseInt(annualIncome);
    const extraIncomeInt = parseInt(extraIncome);
    const totalDeductionsInt = parseInt(totalDeductions);


    const netIncome = (annualIncomeInt + extraIncomeInt) - totalDeductionsInt;
    if(netIncome <= 800000){
        taxResult.innerHTML = netIncome;
    }else{
        let taxRate;
        if(ageGroup === "<40"){
            taxRate = 0.3;
        }else if(ageGroup === ">=40 & 60"){
            taxRate = 0.4;
        }
        else{
            taxRate = 0.1;
        }
        let tax = taxRate * (netIncome-800000);
        taxResult.innerHTML = tax.toLocaleString();
    }


    resultContainer.style.visibility = "visible";

});

closeButton.addEventListener("click", () => {
    resultContainer.style.visibility = "hidden";
    taxCalculationForm.reset();
});


function isOnlyNumbers(str) {
    if(!str){
        return false;
    }
    return str.split('').every(ch => ch >= '0' && ch <= '9');
}

