let latitude
let longitude
let searchInput = document.getElementById('searchTerm')
let searchForm = document.getElementById('searchForm')
let category = document.getElementById('categoryButtons')

navigator.geolocation.getCurrentPosition(init)

function init(location){
    searchForm.addEventListener('submit',handleSubmit)
    category.addEventListener('click',searchCategory)
    latitude = location.coords.latitude.toFixed(6)
    longitude = location.coords.longitude.toFixed(6)
}

function handleSubmit(event){
    event.preventDefault()
    searching(searchInput.value)
}

function searching(searchTerm){
    fetchRestaurants(searchTerm)
    //direct to listing page
}

function searchCategory(event){
    if (event.target.matches('.category')){
        searchTerm = event.target.textContent.trim()
        searching(searchTerm)
    }

}

function fetchRestaurants (searchTerm){
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
