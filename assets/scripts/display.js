let yelpFetch = JSON.parse(localStorage.getItem('yelpFetch'))
let zomatoFetch = JSON.parse(localStorage.getItem('zomatoFetch'))
let info = yelpFetch.businesses

//if there is search result, show them
//if no search result within 10 km, show no result on the page
if (yelpFetch){
    let col;
    yelpFetch.businesses.forEach(function(restaurant, index){
        if (index % 2 === 0) {
            col = document.createElement('div')
            col.classList.add('columns');
            col.appendChild(createDisplayCard(restaurant));
        } else {
            col.appendChild(createDisplayCard(restaurant));
            document.getElementById('cards').appendChild(col)
        }
    });
}

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

function createCard(content, footer) {
    const cardCol = createColumn()
    const card = document.createElement('div')
    card.classList.add('box')
    card.appendChild(content)
    card.appendChild(footer)
    cardCol.appendChild(card)
    return cardCol;
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

document.getElementById('burger-menu').addEventListener('click', function(event){
    const menuID = event.target.dataset.target;
    const menu = document.getElementById(menuID);
    event.target.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });