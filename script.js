// let API_KEY="109a3159";
let searchval = document.getElementById('input1');
let poster_cntainer = document.getElementById('image-poster-container');
// console.log(searchval.value)
let URL = "https://www.omdbapi.com/?i=tt3896198&apikey=109a3159";
let pagenation = document.getElementById('pagination');


function debouncing(fetchmoieapi, delay) {
    let timer;
    return () => {
        timer && clearInterval(timer);
        timer = setTimeout(() => {
            fetchmoieapi();
        }, delay)
    }
}
async function fetchmoieapi(page = 1) {
    let res = await fetch(`${URL}&s=${searchval.value}&page=${page}`);
    let data = await res.json();
    // console.log(data);
    let { Search, totalResults, Response } = data;
    data.Response === "False" ? responsefalse() : diplyaonui(page, data);

    // poster_cntainer.append(diplyaonui(data));
}
function responsefalse() {
    pagenation.innerHTML = "";
    poster_cntainer.innerHTML = `No match found on our search ${searchval.value}`
}
function diplyaonui(page, { Search, totalResults }) {

    poster_cntainer.innerHTML = "";
    console.log(Search);
    Search.forEach(element => {

        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <div class="cardinner">
       
        <img src="${element.Poster}" alt="" >
    <h2>Released on:-${element.Year}</h2>
    <h2>Title:-${element.Title}</h2>
    </div>
   
    `
        poster_cntainer.appendChild(card)
    });
    displaypagination(page, totalResults);
}

document.getElementById('input1').addEventListener('input', debouncing(fetchmoieapi, 500));


function displaypagination(currentpage, totalResults) {
    let page1 = Math.ceil(totalResults / 10);
    // console.log(page1);
    pagenation.innerHTML = `  
    <button onclick="fetchmoieapi(${currentpage - 1})"  ${currentpage == 1 ? "disabled" : ""}  value="Previous" class="border-4 p-2 w-24 font-bold">Previous</button>
    <span>${currentpage} of ${page1}</span>
    <button  onclick="fetchmoieapi(${currentpage + 1})"  ${currentpage === page1 ? "disabled" : ""} value="Next" class="border-4 p-2 w-24 font-bold">Next</button>
    <br>`
}