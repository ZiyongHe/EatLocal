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
    // fetchRestaurants(searchInput, latitude, longitude)
    if(searchInput.length === 0) {
          
        // const button = document.getElementById("mybutton");
        const modal = document.getElementById("formodal");
        const close = document.getElementsByClassName("modal-close")[0];
        // button.onclick = function() {
            modal.style.display = "block";
//    } 
        modal.onclick = function() {
            modal.style.display = "none";
            console.log(close);
        }
        // window.onclick = function(event) {
        //     if (event.target.className == "modal-background") {
        //         modal.style.display = "none";
        //         }
        //     }
 
        }
    else (fetchRestaurants(searchInput, latitude, longitude));
}

function searchCategory(event, longitude, latitude){
    if (event.target.matches('.category')){
        searchTerm = event.target.textContent.trim()
        fetchRestaurants(searchTerm, latitude, longitude)
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
        console.log(data)
        localStorage.setItem('yelpFetch',JSON.stringify(data))
        getZomatoData(searchTerm, latitude, longitude)
        }
    )

}

//I moved zomato function to here, cause didnt need it for searching until we have a specific name of a restaurant, havent put it to use yet
function getZomatoData(searchTerm, lat, lon) {
    const ZOMATO_API_KEY =
        'e97f8a0c15411b5568c8f26befb3d704';
        const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
        const BASE_URL = `https://developers.zomato.com/api/v2.1/search?`;
        const url = `${CORS_PROXY}${BASE_URL}lat=${lat}&lon=${lon}&q=${searchTerm}`
        fetch(url, {
        headers: {
            'user-key': ZOMATO_API_KEY
        }
        })
        .then(response => response.json())
        .then( function(data){
            console.log(data)
            localStorage.setItem('zomatoFetch',JSON.stringify(data))
            // window.location = './search.html'
            }
        )
}

document.getElementById('burger-menu').addEventListener('click', function(event){
    const menuID = event.target.dataset.target;
    const menu = document.getElementById(menuID);
    event.target.classList.toggle('is-active');
    menu.classList.toggle('is-active');
})


      


        
        
  
    


