import './css/styles.css';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector(`#search-box`),
  ulList: document.querySelector(`.country-list`),
  container: document.querySelector(`.country-info`),
};

function fetchCountries(name) {
  const resp = fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(Response => {
      Response.json();
    })
    .then(country => {});
}

fetchCountries(`deutschland`);
