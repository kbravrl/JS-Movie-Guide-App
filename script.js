// Initial References
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Function to fetch data from API
let getMovie = () => {
    let movieName =  movieNameRef.value.trim();
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    // If input field is empty
    if(movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
    }
    // If input field is not empty
    else {
        fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            // If movie exits in database
            if (data.Response == 'True') {
                result.innerHTML = `
                    <div class="info">
                        <img src="${data.Poster}" class="poster" alt="${data.Title} Poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                ${data.Genre.split(",").
                                map(genre => `<div>${genre}</div>`).join("")}  
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cats:</h3>
                    <p>${data.Actors}</p>
            `;
            } 

            // If movie does not exist in database
            else {
                result.innerHTML = `<h3 class="msg">${data.
                    Error}</h3>`
            }
        })
        .catch(() => {
            result.innerHTML = `<h3 class="msg">Error Occured</h3>`
        });
    }

};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
