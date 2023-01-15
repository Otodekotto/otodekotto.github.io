async function fetchPosts(){
    try{
        const postsResponse = await fetch("https://hickory-quilled-actress.glitch.me/computers")
        const posts = await postsResponse.json()
        return posts
    }
    catch(error){
        console.log(error)
    }   
}

export default fetchPosts