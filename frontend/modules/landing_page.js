import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
  // console.log('I am from init method')
  // console.log(config)
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let res = await fetch(`${config.backendEndpoint}/cities`);
    let data = await res.json();
    // console.log(data)
    return data
  } catch (error) {
    return null
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // console.log('i am from city')
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let ele1 = document.createElement('h5')
  ele1 = city
  console.log(city);
  let ele2 = document.createElement('p')
  ele2 = description
  let divtile = document.createElement('div')
  let divtile1 = document.createElement('div')
  let divtile2 = document.createElement('div')
  divtile.classList.add('tile-text')
  divtile1.append(ele1)
  divtile2.append(ele2)
  divtile.append(divtile1)
  divtile.append(divtile2)

  let divcol = document.createElement('div')
  divcol.classList.add('col-sm-6')
  divcol.classList.add('col-lg-3')
  divcol.classList.add('my-4')
  divcol.classList.add('tile')

  let anc = document.createElement('a')
  anc.href=`pages/adventures/?city=${id}`
  anc.id = id

  let img = document.createElement('img')
  img.src = image

  anc.append(img)
  anc.append(divtile)

  divcol.appendChild(anc)
  
  let d = document.getElementById('data')
  data.append(divcol)

  // console.log('i am from card')


  

}

export { init, fetchCities, addCityToDOM };
