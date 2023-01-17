async function fetchLaptops(){
    try{
        const laptopsResponse = await fetch("https://hickory-quilled-actress.glitch.me/computers")
        const laptops = await laptopsResponse.json()
        return laptops
    }
    catch(error){
        console.log(error)
    }   
}

export default fetchLaptops