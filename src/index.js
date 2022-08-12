import './css/styles.css';
import debounce from 'lodash.debounce';
import API from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//import Notiflix { Notify } from 'notiflix';


// Notify.success('Sol lucet omnibus');
// Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

console.log(searchBox);

const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
    const searchQuery = searchBox.value.trim(); 
    console.log(searchQuery);

    if (searchQuery === "") {
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        return;
    } 

    API.fetchCountries(searchQuery)
        .then(renderCountry)
        .catch(error => Notify.failure("Oops, there is no country with that name") 
         );
} 

function renderCountry(item) {
    const countContries = item.length;
    console.log(item.length);
    
    if (countContries === 1) {
        dataofCountry(item);
        countryList.innerHTML = '';

    } else if (countContries > 1 && countContries <= 10) {
        listOfCountries(item);
        countryInfo.innerHTML = '';  
    } else if (countContries > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
    };
}

function dataofCountry(item) {
    const markupData = item.map(({name, capital, population, flags, languages}) => {
        return `<h2> <img src="${flags.svg}" alt="${name.official}" width=70px>
            ${name.official} </h2>
             <p class="text"> Capital: ${capital} </p>
            <p class="text">Population: ${population}</p>
            <p class="text">Languages: ${Object.values(languages).join(', ')}</p>`
    }).join("");
    countryInfo.innerHTML = markupData;
    
}

function listOfCountries(item) {
    const markupList = item.map(({ name, flags }) => {
        return `<li class="text"> <img src="${flags.svg}" alt="${name.official}" class="img-list">
        ${name.official}</li>`
    }).join('');

    countryList.innerHTML = markupList;
}