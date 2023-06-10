const accessKey = '';
const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector('.search-results');
const showMoreButton = document.getElementById("show-more-button");
const clearButton = document.getElementById("clean-button");

let inputData = "";
let page = 1;
async function searchImages() {
    inputData = searchInputEl.value;
    console.log(typeof inputData);
    if(inputData === "") {
        searchResultsEl.innerHTML = "";
        showMoreButton.style.display = 'none';
        clearButton.style.display = 'none';
        return;
    }
        
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if(page === 1) {
        searchResultsEl.innerHTML = "";
    }
    const results = data.results;
    flag = false;
    results.map((result) => {
        const imageWraper = document.createElement('div');
        imageWraper.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.urls.small;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;
        imageWraper.appendChild(image);
        imageWraper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWraper); 
        flag = true;
    })
    if(flag)
        page++;
    if(page > 1) {
        showMoreButton.style.display = 'block';
        clearButton.style.display = 'block';
    }
    
}

formEl.addEventListener("submit" ,(e) => {
    e.preventDefault();
    page = 1; 
    searchImages();
});

showMoreButton.addEventListener('click' , () => {
    searchImages();
});

clearButton.addEventListener("click" , () => {
    searchResultsEl.innerHTML = "";
    showMoreButton.style.display = 'none';
    clearButton.style.display = 'none';
})
