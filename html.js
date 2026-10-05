const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns = document. querySelectorAll(".dropdown select");

const btn = document. querySelector("form button");
const fromcurr = document. querySelector(".from select");
const tocurr = document. querySelector(".to select");
const msg = document. querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
       let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode ==="USD"){
            newOption. selected = "selected";
        }else if(select.name === "to" && currCode ==="INR"){
            newOption. selected = "selected";
        }
        select.append(newOption);
    }
    select. addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element. value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn. addEventListener("click",async(evt) => {
    evt.preventDefault();
    let amount = document. querySelector(".amount input");
    let amtVal = amount. value;
    console. log(amtVal);
    if(amtVal == "" || amtVal < 1){
        amtVal=1;
        amount. value = "1";
    }
    const apiURL = `${BASE_URL}${fromcurr.value.toLowerCase()}.json`    
    
    let response = await fetch(apiURL);
    let data = await response.json ();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    
    let finalAmount = rate * amtVal;
    msg. innerText = `${amtVal} ${fromcurr.value} =${finalAmount} ${tocurr.value}`
});

