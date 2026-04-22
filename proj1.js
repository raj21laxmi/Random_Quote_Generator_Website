const quote = document.getElementsByTagName("blockquote")[0];
const author = document.getElementsByClassName("author")[0];

const newQuote = document.querySelector(".quote_btn");
const tweetBtn = document.querySelector(".tweet_btn");

// multiple APIs
const apis = [
    "https://api.quotable.io/random",
    "https://zenquotes.io/api/random",
    "https://dummyjson.com/quotes/random"
];

//global variable
let temp;

// API call ----> Async await
const getData = async () => {
    for (let api of apis) {
        try {
            const response = await fetch(api);
            if (!response.ok) throw new Error("API failed");

            const data = await response.json();

            let quoteText, authorText;

            // handle different APIs
            if (api.includes("quotable")) {
                quoteText = data.content;
                authorText = data.author;
            } else if (api.includes("zenquotes")) {
                quoteText = data[0].q;
                authorText = data[0].a;
            } else if (api.includes("dummyjson")) {
                quoteText = data.quote;
                authorText = data.author;
            }

            quote.innerText = quoteText;
            author.innerText = authorText;
            temp = quoteText;

            return; // stop after success

        } catch (err) {
            console.log("API failed:", api);
        }
    }

    // fallback if all fail
    quote.innerText = "Failed to load quote";
    author.innerText = "";
};

//function call
getData();

newQuote.addEventListener("click", () => {
    getData();
});

// tweet fix
tweetBtn.addEventListener("click", () => {
    window.open(
        "https://twitter.com/intent/tweet?text=" + encodeURIComponent(temp),
        "tweet post",
        "width=400,height=400"
    );
});

// whatsapp fix (renamed vars)
document.querySelector('.whatsapp_btn').addEventListener('click', () => {
    const quoteText = document.querySelector("blockquote").innerText;
    const authorText = document.querySelector(".author").innerText;

    const message = encodeURIComponent(`${quoteText}\n\n— ${authorText}`);
    window.open(`https://wa.me/?text=${message}`, "_blank");
});