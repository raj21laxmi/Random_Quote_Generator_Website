
const quote = document.getElementsByTagName("blockquote")[0];
const author = document.getElementsByClassName("author")[0];

const newQuote = document.querySelector(".quote_btn");
const tweetBtn = document.querySelector(".tweet_btn");
const apiLink = "https://quotes-api-self.vercel.app/quote";


//global variable
let temp;
// API call ----> Async await

const getData = async ()=>{
    const response = await fetch(apiLink);
    const data = await response.json();
    //console.log(data);
    //console.log(data.author);
    //console.log(data.quote);
   
    quote.innerText = data.quote;
    author.innerText = data.author;
    temp = data.quote;
};

//function call
getData();

newQuote.addEventListener("click",()=>{
        getData();
})

//window.open---->open a new window 
// it takes 3 argument (link,name , specification)
tweetBtn.addEventListener("click", ()=>{
    window.open("https://twitter.com/intent/tweet?text=" + temp, 
        "tweet post", "width=400, height=400" );
});

document.querySelector('.whatsapp_btn').addEventListener('click', () => {
    const quote = document.querySelector("blockquote").innerText;
    const author = document.querySelector(".author").innerText;

    const message = encodeURIComponent(`${quote}\n\n— ${author}`);

    window.open(`https://wa.me/?text=${message}`, "_blank");
});




// Dynamically change the content we use DOM(document Object model)
