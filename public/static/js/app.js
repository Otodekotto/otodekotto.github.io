import fetchLaptops from "./api/getlaptops.js";

const laptopsElement = document.getElementById("laptops");
const loanButtonElement = document.getElementById("loanbutton")
const bankButtonElement = document.getElementById("bankbutton")
const workButtonElement = document.getElementById("workbutton")
const repayDebtButtonElement = document.getElementById("repaydebtbutton")
const buyButtonElement = document.getElementById("buybutton")
const laptopSpecElement = document.getElementById("laptopspec")
const laptopNameElement = document.getElementById("laptopname")
const laptopDescriptionElement = document.getElementById("laptopdescription")
const laptopImageElement = document.getElementById("laptopimage")
const laptopPriceElement = document.getElementById("laptopprice")
const computerownedElement = document.getElementById("ownedcomputer")

const payValueElement = document.getElementById("payvalue")
const bankValueElement = document.getElementById("bankvalue")

const textDebtElement = document.getElementById("textdebt")
const debtValueElement = document.getElementById("debtvalue")
const nomMoneyTextElement = document.getElementById("nomoneytext")

textDebtElement.style.visibility = "hidden";
debtValueElement.style.visibility = "hidden";
repayDebtButtonElement.style.visibility = "hidden";
nomMoneyTextElement.style.visibility = "hidden";

let balance = 0;
let salary = 0;
let totalloan = 0;

payValueElement.innerHTML = salary + "kr";
bankValueElement.innerHTML = balance + "kr";

//fetch data of all the laptops
const laptops = await fetchLaptops()
console.log(laptops)

//add laptops into databas
const addLaptopsToStorage = (laptops) => {
    laptops.forEach(x => addLaptopToStorage(x));
}

//make a list of laptop
const addLaptopToStorage = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
}

addLaptopsToStorage(laptops)

//handling the laptop infomaration when drop down bar is selected
const handlerLaptopChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex];
    laptopSpecElement.innerText = selectedLaptop.specs;
    laptopNameElement.innerText = selectedLaptop.title;
    laptopDescriptionElement.innerHTML = selectedLaptop.description;
    //hardcode Currency, no currency in data.
    laptopPriceElement.innerHTML = selectedLaptop.price + " kr";;


    laptopImageElement.src = "https://hickory-quilled-actress.glitch.me/" + selectedLaptop.image;
    //if image wont load
    laptopImageElement.onerror = imageNotFound;
}

//if image wont load, give an alert
function imageNotFound() {
    alert("Image not found")

}

//function to load up a infomartion at start of the website, so that website wont be empty
function startwithinformation() {
    const selectedLaptop = laptops[0];
    laptopSpecElement.innerText = selectedLaptop.specs;
    laptopNameElement.innerText = selectedLaptop.title;
    laptopDescriptionElement.innerHTML = selectedLaptop.description;
    laptopImageElement.src = "https://hickory-quilled-actress.glitch.me/" + selectedLaptop.image;

    laptopPriceElement.innerHTML = selectedLaptop.price + " kr";
}

//main logic function for the program
const handleMoney = (e) => {
    let element = e.target

    //if loan button is clicked
    if (element.id === "loanbutton") {
        //how much you wanna loan
        var loanvalue = Number(prompt("please enter your loan amount", "0"));

        //Check if u have a loan already
        if (totalloan === 0) {
            //Loan up to 2times your balance & loanvalue cant be a negative number
            if (loanvalue <= 2 * balance && loanvalue > 0) {

                balance += loanvalue;
                totalloan += loanvalue;
                bankValueElement.innerHTML = balance + "kr";
            }

        }
        //if u cant loan nothing happends
        else {
        }
    }

    //work button pressed, and give you 100kr
    else if (element.id === "workbutton") {
        salary += 100;
        payValueElement.innerHTML = salary + "kr";
    }
    //bank button press
    else if (element.id === "bankbutton") {
        //check if you have a loan, if u do. Pay 10% of ur work pay into debt and 90% goes to ur bank
        if (totalloan > 0) {
            totalloan -= salary * .1
            //check if you the value you paid is more then totalloan, refund the extra to the bank.
            if (totalloan < 0) {
                balance += salary * 0.9;
                console.log(totalloan);
                balance -= totalloan;
                totalloan = 0;
            }
            //90% of ur salary to ur bank balance if you still have debt.
            else {
                balance += salary * 0.9;
            }
            //reset salary
            salary = 0;
            payValueElement.innerHTML = salary + "kr";
            bankValueElement.innerHTML = balance + "kr";
        }
        //if you didnt have any debt all money goes to the bank
        else {
            balance += salary;
            salary = 0;
            payValueElement.innerHTML = salary + "kr";
            bankValueElement.innerHTML = balance + "kr";
        }

    }
    //if repaydebt button was clicked, use all ur salary to pay off the debt
    else if (element.id === "repaydebtbutton") {
        totalloan -= salary;
        if (totalloan < 0) {
            balance -= totalloan;
            totalloan = 0;
        }

        salary = 0;
        debtValueElement.innerHTML = totalloan + "kr";
        payValueElement.innerHTML = salary + "kr";
        bankValueElement.innerHTML = balance + "kr";
    }
    //buy button pressed
    else if (element.id === "buybutton") {
        //check if have enough money to buy
        if (balance >= Number(laptopPriceElement.innerHTML.replace(" kr", ""))) {
            //remove kr from the string and convert to number
            balance -= Number(laptopPriceElement.innerHTML.replace(" kr", ""));
            bankValueElement.innerHTML = balance + "kr";

            //create list of what you own
            const computers = document.createElement("li");
            computers.innerHTML = laptopNameElement.innerText;
            console.log(computers)
            computerownedElement.appendChild(computers)
            nomMoneyTextElement.style.visibility = "hidden"
        }
        //if you didnt have any money No Money text will pop up
        else {
            nomMoneyTextElement.style.visibility = "visible"
        }
    }
    //fail safe.
    else {
        console.log("failsafe no button pressed")
    }
    //if you have debt buttons and text will pop up
    if (totalloan > 0) {
        textDebtElement.style.visibility = "visible";
        debtValueElement.style.visibility = "visible";
        repayDebtButtonElement.style.visibility = "visible";
        debtValueElement.innerHTML = totalloan + "kr"
    }
    //if you dont have any loan/debt hide the text and buttons.
    else {
        textDebtElement.style.visibility = "hidden";
        debtValueElement.style.visibility = "hidden";
        repayDebtButtonElement.style.visibility = "hidden"
    }
}

//click event listeners
loanButtonElement.addEventListener("click", handleMoney);
bankButtonElement.addEventListener("click", handleMoney);
workButtonElement.addEventListener("click", handleMoney);
repayDebtButtonElement.addEventListener("click", handleMoney);
buyButtonElement.addEventListener("click", handleMoney);
laptopsElement.addEventListener("change", handlerLaptopChange)

//start the site with laptop information
startwithinformation()