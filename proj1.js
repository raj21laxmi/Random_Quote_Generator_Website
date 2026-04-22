const quote = document.getElementsByTagName("blockquote")[0];
const author = document.getElementsByClassName("author")[0];

const newQuote = document.querySelector(".quote_btn");
const tweetBtn = document.querySelector(".tweet_btn");

// working APIs
const apis = [
    "https://api.quotable.io/random",
    "https://dummyjson.com/quotes/random"
];

//global variable
let temp;

// timeout fetch (prevents hanging)
const fetchWithTimeout = (url, timeout = 5000) => {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), timeout)
        )
    ]);
};

// API call
const getData = async () => {
    quote.innerText = "Loading...";
    author.innerText = "";

    for (let api of apis) {
        try {
            const response = await fetchWithTimeout(api);

            if (!response.ok) throw new Error("API failed");

            const data = await response.json();

            let quoteText, authorText;

            // handle APIs
            if (api.includes("quotable")) {
                quoteText = data.content;
                authorText = data.author;
            } else if (api.includes("dummyjson")) {
                quoteText = data.quote;
                authorText = data.author;
            }

            quote.innerText = quoteText;
            author.innerText = authorText;
            temp = quoteText;

            return;

        } catch (err) {
            console.log("API failed:", api);
        }
    }

    // fallback if all APIs fail
    quote.innerText = "Stay positive, work hard, make it happen.";
    author.innerText = "Unknown";
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

// whatsapp fix
document.querySelector('.whatsapp_btn').addEventListener('click', () => {
    const quoteText = document.querySelector("blockquote").innerText;
    const authorText = document.querySelector(".author").innerText;

    const message = encodeURIComponent(`${quoteText}\n\n— ${authorText}`);
    window.open(`https://wa.me/?text=${message}`, "_blank");
});
