
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let param = new URLSearchParams(search)
  let Cityid = param.get("city")
  return Cityid

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
    try {
      let res = await fetch (`${config.backendEndpoint}/adventures?city=${city}`) 
      let d = await res.json()
      console.log(d)
      return d
    } catch (error) {
      return null
    }
  

}
function show (data){
  console.log(data)
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log("adventures array :")


  console.log(adventures)

  for(let i=0; i<adventures.length; i++){
    // console.log('from loop')
    let ele2 = document.createElement('p')
    let ele1 = document.createElement('p')
    let ele3 = document.createElement('p')
    let ele4 = document.createElement('p')
    ele1.innerHTML = adventures[i].name
    ele3.innerHTML = "₹"+adventures[i].costPerHead
    ele2.innerHTML = 'Duration'
    ele4.innerHTML = adventures[i].duration+' hours'
    
    // Show (adventures.duration[i]) 
    // console.log("duratuon "+ele4.innerHTML);
  
    let divcar1 = document.createElement('div')
    // divcar1.classList.add('card-body')
    divcar1.classList.add('text-center')
    divcar1.classList.add('d-md-flex')
    divcar1.classList.add('crd-text')
    divcar1.classList.add('justify-content-between')
    divcar1.append(ele1)
    divcar1.append(ele3) 
        // console.log(divcar1);


    let divcar2 = document.createElement('div')
    // divcar2.classList.add('card-body')
    divcar2.classList.add('text-center')
    divcar2.classList.add('d-md-flex')
    divcar2.classList.add('crd-text')
    divcar2.classList.add('justify-content-between')
    divcar2.append(ele2) 
    divcar2.append(ele4)
    // console.log(divcar2);

    let divcar3 = document.createElement('div')
    divcar3.classList.add('cardd')
    divcar3.append(divcar1)
    divcar3.append(divcar2)
  
    let img = document.createElement('img')
    img.src = adventures[i].image 
    img.classList.add('card-img-top')
    // console.log(img);

    let divcat = document.createElement('div')
    divcat.classList.add('category-banner')
    divcat.innerHTML=adventures[i].category

    
    let divactive = document.createElement('div')
    divactive.classList.add('activity-card')
  
    divactive.append(img)
    divactive.append(divcat)
    divactive.append(divcar3)

    // console.log(divactive);

    let anc = document.createElement('a')
    anc.href = `detail/?adventure=${adventures[i].id}`
    anc.id = adventures[i].id
    // console.log(anc);
    
    
    // let divcol = document.createElement('div')
    anc.classList.add('col-6')
    anc.classList.add('col-lg-3')
    anc.classList.add('mb-3')
    // anc.appendChild(anc)
    anc.appendChild(divactive)
    // console.log(divcol);

    
    // getElementById
    let m = document.getElementById("data")
    m.appendChild(anc)
    // console.log("loop end")
    // console.log(m); 
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let fd = list.filter((e) => {
    if(e.duration >= parseInt(low) && e.duration <= parseInt(high)){
      return e
    }
  })
  return fd
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let fc = list.filter((e)=>{
    if(categoryList.includes(e.category)){
      return e
    }
  })
  return fc
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let fr = list
  if(filters.category.length!=0 && filters.duration.length==0){
    fr = filterByCategory(list, filters.category)
  }
  if(filters.duration.length!=0 && filters.category.length==0){
    fr = filterByDuration(list , filters.duration.split("-")[0], filters.duration.split("-")[1])
    console.log("durationnn")
  }

  if(filters.duration.length != 0 && filters.category.length != 0){
    let f1 = filterByDuration(list, filters.duration.split("-")[0], filters.duration.split("-")[1]);
    let f2 = filterByCategory(f1, filters.category);
    fr = f2;
  }

  console.log(filters.duration)

  // Place holder for functionality to work in the Stubs
  return fr;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters))

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const d = JSON.parse(localStorage.getItem("filters"))
  // Place holder for functionality to work in the Stubs
  return d;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let p = filters.category
  let pDiv = document.getElementById('category-list')

  p.forEach((ele) => {
    let pl = document.createElement('div')
    pl.innerText=(ele)
    pl.setAttribute("class", "category-filter")
    pDiv.append(pl)
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
