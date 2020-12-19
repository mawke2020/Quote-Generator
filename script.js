// get quote from Api 
const quoteContiner = document.getElementById("quote-continer");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twiterbtn= document.getElementById("twitter");
const NewQuotebtn = document.getElementById("newquote");
const loader = document.getElementById("loader");



// showing loader 
function showloader(){
    loader.hidden = false;
    quoteContiner.hidden= true;
}
// hidden loader 
function hideloader(){
    if (!loader.hidden){
        quoteContiner.hidden=false;
        loader.hidden= true
    }
}


async function GetQuotes(){
    showloader()
    const proxyUrl = "https://still-refuge-11240.herokuapp.com/";
    const quoteApi="http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";


    const response = await fetch(proxyUrl + quoteApi);
    const  data  = await response.json();
    console.log(data)
    console.log(data.quoteAuthor)
    console.log(data.quoteText)

    
    if (data.quoteAuthor === ""){
        authorText.innerText = "Uknown";
    }else {
        authorText.innerText = data.quoteAuthor;
    }
    if (data.quoteText.length > 120){
        quoteText.classList.add("long-text")
    }else{
        quoteText.classList.remove("long-text")
    }

    quoteText.innerText = data.quoteText;

    hideloader()
}
    


function TweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quote}-${author}`;

    window.open(twitterUrl,"_blank");
}

// Events 


NewQuotebtn.addEventListener("click",GetQuotes)

twiterbtn.addEventListener("click",TweetQuote);

// on load 
GetQuotes()