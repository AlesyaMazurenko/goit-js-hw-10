import './css/styles.css';
import debounce from 'lodash.debounce';
// form.addEventListener('input', throttle(onTextareaInput, 500));
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Notify.success('Sol lucet omnibus');
// Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

console.log(searchBox);

const DEBOUNCE_DELAY = 1000;

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
    const searchQuery = searchBox.value;
    console.log(searchQuery);

    fetchCountries(searchQuery);//.then(renderCountry);

}

const BASE_URL = "https://restcountries.com/v2/name/";
function fetchCountries(name) {
// const r =
   return fetch(`BASE_URL${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            // console.log(response.json);
            return response.json();
        })
       .then(country => {
           console.log("data", country);
          const stroka = `<li>"${ Object.values(name) }"</li>`//`<li>${Object.values(capital)}</li>`;
          console.log(stroka);
        })
        .catch(error => {
            console.log(error);
        });
// console.log(r);

}

// function renderCountry(item) {
//     const stroka = "<li>${item.name}</li>";
//     console.log(stroka);

// }
