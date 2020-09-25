//ensure user accepts to get location first
navigator.geolocation.getCurrentPosition(init)

function init(location){
    const latitude = location.coords.latitude.toFixed(6)
    const longitude = location.coords.longitude.toFixed(6)

    const searchInput = document.getElementById('searchTerm')
    const searchForm = document.getElementById('searchForm')
    searchForm.addEventListener('submit', function(event) {
        handleSubmit(event, searchInput.value, latitude, longitude)
    })

    const category = document.getElementById('categoryButtons')
    if (category) {
        category.addEventListener('click', function(event) {
            searchCategory(event, longitude, latitude)
        })
    }
}

function handleSubmit(event, searchInput, latitude, longitude){
    event.preventDefault()
    searching(searchInput, latitude, longitude)
}

function searching(searchTerm, latitude, longitude){
    fetchRestaurants(searchTerm, latitude, longitude)
    //direct to listing page
}

function searchCategory(event, longitude, latitude){
    if (event.target.matches('.category')){
        searchTerm = event.target.textContent.trim()
        searching(searchTerm, latitude, longitude)
    }

}

function fetchRestaurants (searchTerm, latitude, longitude){
    const YELP_API_KEY =
        'NdXFjJC2Z5-HgDBjoNaueLO36hrPTyedCA-GNKcoSl6oYQV6qiIkWXI89HGaxlrEoBNYFt0CFYeiMhyb8rCYqUqWfbF0-qRXgBJOYHirnXdPjl2kjj_3w-6MySlmX3Yx'
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    const BASE_URL = 'https://api.yelp.com/v3/businesses'
    const geoCoords = `latitude=${latitude}&longitude=${longitude}`
    const url = `${CORS_PROXY}${BASE_URL}/search?radius=10000&categories=restaurants&term=${searchTerm}&${geoCoords}`

    fetch(url, {
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + YELP_API_KEY
        }
    })
    .then(response => response.json())
    .then( function(data){
        localStorage.setItem('yelpFetch',JSON.stringify(data))
        }
    )

}

document.getElementById('burger-menu').addEventListener('click', function(event){
    const menuID = event.target.dataset.target;
    const menu = document.getElementById(menuID);
    event.target.classList.toggle('is-active');
    menu.classList.toggle('is-active');
})
