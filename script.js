const accessKey = "nchzW72A9O8yx1hYRZsUCdlG3PIYxf-XDZeFRdobdmU";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    if (results.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = "There is no data for the word you searched. Please search for something else.";
        searchResults.appendChild(noResultsMessage);
        showMoreButton.style.display = "none";
    } else {
        results.forEach((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("search-result");
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;
        if (page > 1) {
            showMoreButton.style.display = "block";
        }
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", () => {
    searchImages();
});
