let yelpFetch = JSON.parse(localStorage.getItem('yelpFetch'))
let zomatoFetch = JSON.parse(localStorage.getItem('zomatoFetch'))
let info = yelpFetch.businesses

//if there is search result, show them
//if no search result within 10 km, show no result on the page
if (yelpFetch){
    yelpFetch.businesses.forEach(place => {
        
    });
}


//just using the first restaurant of the object, will need a for loop for all restaurants, need to find a way to generate number of sections accordingly to search result
document.getElementById('image').setAttribute('src','https://s3-media1.fl.yelpcdn.com/bphoto/iD1cCbTASjC7YOb3BZAWDw/o.jpg')
document.getElementById('name').textContent=info[0].name
document.getElementById('name').setAttribute('href',`${info[0].url}`) //this doesn't work yet
document.getElementById('phone').textContent=info[0].display_phone
document.getElementById('type').textContent=info[0].categories[0].alias
let transaction = document.getElementById('transaction')
if (info[0].transactions.length === 0){
    transaction.textContent = 'Dine in only'
} else{
    for (way in transaction){
        document.getElementById('transaction').textContent= way + ' '
    }
}
document.getElementById('distance').textContent=(parseInt(info[0].distance)/1000).toFixed(1).toString() + ' km'
let rating = info[0].rating
document.getElementById('rating').setAttribute('src',`./assets/images/large_${Math.floor(rating)}.png`)
document.getElementById('review').textContent=info[0].review_count + " reviews"
if (document.getElementById('is-closed')){
    document.getElementById('is-closed').textContent='Closed'
}else if (!(document.getElementById('is-closed'))){
    document.getElementById('is-closed').textContent='Open'
}
document.getElementById('price').textContent=info[0].price || '$?'
//Not all restaurants contain a expensive rating

function createDisplayCard(restaurantObj) {
    const restaurantContent = createCardContent(restaurantObj)
    const restaurantFooter = createCardFooter(restaurantObj)
    const restaurantCard = createCard(restaurantContent, restaurantFooter)
    return restaurantCard
}

function createColumn() {
    const column = document.createElement('div')
    column.classList.add('column')
    return column
}

function createCardContent(restaurantObj) {
    const cardContent = document.createElement('div')
    cardContent.classList.add('card-content', 'columns', 'is-desktop')

    const imageCol = createColumn()
    const imageWrap = document.createElement('figure');
    imageWrap.classList.add('image')
    imageWrap.innerHTML =
        `<img id='image' src="${restaurantObj.image_url}">`
    imageCol.appendChild(imageWrap);

    const contentCol = createColumn()
    const contentWrap = document.createElement('div')
    contentWrap.classList.add('content')
    contentWrap.innerHTML =
        `<p class="title is-4" id="name">${restaurantObj.name}</p>
        <p class="subtitle is-5" id="type">${restaurantObj.categories[0].title}</p>
        <p id='transaction'>Lunch, Dine in, Something</p>
        <p class="subtitle" id='price'>${restaurantObj.price ? restaurantObj.price : ''}</p>
        <img class="mb-0" id="rating" src="./assets/images/large_${Math.floor(restaurantObj.rating)}.png" alt="${Math.floor(restaurantObj.rating)} stars">
        <a href="${restaurantObj.url}"><img src="./assets/images/yelp_trademark.png" alt="" style="max-width: 70px; height: auto;"></a>
        <p id="review">${restaurantObj.review_count} Reviews on Yelp</p>`
    contentCol.appendChild(contentWrap)

    const distanceCol = createColumn()
    distanceCol.classList.add('has-text-right-desktop')
    distanceCol.innerHTML =
        `<p class="subtitle is-5 mb-0" id='distance'>${(parseInt(restaurantObj.distance)/1000).toFixed(1)} km away from you</p>
        <p class="subtitle is-5" id='is-closed'>${restaurantObj.is_closed ? 'Closed' : 'Open'}</p>`

    cardContent.appendChild(imageCol)
    cardContent.appendChild(contentCol)
    cardContent.appendChild(distanceCol)
    return cardContent
}

function createCardFooter(restaurantObj) {
    const footer = document.createElement('footer')
    footer.classList.add('card-footer')

    const phoneNumber = document.createElement('div')
    phoneNumber.classList.add('card-footer-item')
    phoneNumber.innerHTML =
        `<a href="tel:${restaurantObj.phone}"><i class="fas fa-phone mr-3"></i><span clas="icon" id="phone">${restaurantObj.display_phone}</span></a>`

    const directions = document.createElement('div')
    directions.classList.add('card-footer-item')
    directions.innerHTML =
        `<a href="https://www.google.com/maps/dir/?api=1&destination=${restaurantObj.name}"><span clas="icon"><i class="fas fa-directions mr-3"></i></span>Directions</a>`
    
    footer.appendChild(phoneNumber)
    footer.appendChild(directions)
    return footer
}


//I moved zomato function to here, cause didnt need it for searching until we have a specific name of a restaurant, havent put it to use yet
function getZomatoData(lat, lon) {
    const ZOMATO_API_KEY =
        'e97f8a0c15411b5568c8f26befb3d704';
        const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
        const BASE_URL = `https://developers.zomato.com/api/v2.1/search?`;
        const url = `${CORS_PROXY}${BASE_URL}lat=${lat}&lon=${lon}`
        fetch(url, {
        headers: {
            'user-key': ZOMATO_API_KEY
        }
        })
        .then(response => response.json())
        .then( function(data){
            localStorage.setItem('zomatoFetch',JSON.stringify(data))
            }
        )
    }

document.getElementById('burger-menu').addEventListener('click', function(event){
    const menuID = event.target.dataset.target;
    const menu = document.getElementById(menuID);
    event.target.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });