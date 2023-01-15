import fetchPosts from "../js/api/posts.js";

const laptopsElement = document.getElementById("laptops");
const loanButtonElement = document.getElementById("loanbutton")
const bankButtonElement = document.getElementById("bankbutton")
const payButtonElement = document.getElementById("paybutton")
const laptopSpecElement = document.getElementById("laptopspec")
const laptopNameElement = document.getElementById("laptopname")
const laptopDescriptionElement = document.getElementById("laptopdescription")
const laptopImageElement = document.getElementById("laptopimage")

const laptops = await fetchPosts()
console.log(laptops)

const addLaptopsToStorage = (laptops) => {
    laptops.forEach(x => addLaptopToStorage(x));
}

const addLaptopToStorage = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
}

addLaptopsToStorage(laptops)


const handlerLaptopChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex];
    laptopSpecElement.innerText = selectedLaptop.specs;
    laptopNameElement.innerText = selectedLaptop.title;
    laptopDescriptionElement.innerHTML = selectedLaptop.description;
    //only id 5 is using jpg and doesnt exist. replace to PNG
    if(selectedLaptop.id === 5){
        laptopImageElement.src = "https://hickory-quilled-actress.glitch.me/"+selectedLaptop.image.replace(".jpg", ".png");
    }
    else{
        laptopImageElement.src = "https://hickory-quilled-actress.glitch.me/"+selectedLaptop.image;
    }
    
}

laptopsElement.addEventListener("change", handlerLaptopChange)