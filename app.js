const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdown){
    for (code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && code === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change" , (eve) =>{
        updateFlag(eve.target);
    })
}

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue < 1 || amtValue === ""){
        amtValue = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    try{
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);

    const conversionRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    if(conversionRate){
        const convertedAmount = amtValue * conversionRate;
        msg.innerText = `${amtValue} ${fromCurr.value} = ${convertedAmount.toFixed(2)} ${toCurr.value}`
    }
    else {
        msg.innerText = `Conversion rate for ${toCurr} not found.`;
    }
} catch (error) {
    console.error("Error fetching the exchange rate:", error);
    msg.innerText = "Error fetching the exchange rate. Please try again.";
}
}

const updateFlag = (ele) =>{
    let code = ele.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = ele.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click" , (eve) =>{
    eve.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load" , () =>{
    updateExchangeRate();
});



