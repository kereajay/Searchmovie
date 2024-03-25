let searchval = document.getElementById("input1");
let displaymovies = document.getElementById('image-poster-container');
let pagination = document.getElementById('pagination');


let URL = "http://www.omdbapi.com/?i=tt3896198&apikey=109a3159";


function debouncing(fn, delay) {
    let timer;
    return () => {
        timer && clearInterval(timer);
        timer = setTimeout(() => {
            fn();

        }, delay)
    }
}
async function fetchmovieapi(page = 1) {
    let res = await fetch(`${URL}&s=${searchval.value}&page=${page}`);
    let data = await res.json();
    let { Response, Search, totalResults } = data;
    data.Response === "False" ? flaseresponse() : displayposter(page, data);
}
function displayposter(page, { Search, totalResults, Response }) {
    displaymovies.innerHTML = "";
    // console.log(Search);
    Search.forEach(element => {


        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<img src="${element.Poster}" alt="">
    <h2>${element.Year}</h2>
    <h2>${element.Title}</h2>`
        displaymovies.appendChild(card);
    });
    displaypagination(page, totalResults);
}
function displaypagination(currentpage, totalrecords) {
    let totalpage = Math.ceil(totalrecords / 10);
    pagination.innerHTML = `  
  <button onclick="fetchmovieapi(${currentpage - 1})" ${currentpage === 1 ? "disabled" : ""} value="">previous</button>
  <button onclick="fetchmovieapi(${currentpage + 1})" ${currentpage === totalpage ? "disabled" : ""} value="">next</button>`

}
searchval.addEventListener('input', debouncing(fetchmovieapi, 1000));