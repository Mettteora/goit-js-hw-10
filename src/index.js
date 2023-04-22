import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector(`#search-box`),
  ulList: document.querySelector(`.country-list`),
  container: document.querySelector(`.country-info`),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const country = e.target.value.trim();

  if (!country) {
    e.target.value = '';
    clearMarkup(refs.container);
    clearMarkup(refs.ulList);
    return;
  }

  fetchCountries(country)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        displayMarkup(data);
      }
    })
    .catch(error => {
      if (error.message === '404') {
        clearMarkup(refs.container);
        clearMarkup(refs.ulList);
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
}

function displayMarkup(data) {
  if (data.length === 1) {
    const markup = data.reduce(
      (markup, country) => markup + createMarkupForCounty(country),
      ''
    );
    clearMarkup(refs.ulList);
    container.innerHTML = markup;
  } else {
    const list = data.reduce(
      (markup, country) => markup + createMarkupForCounties(country),
      ''
    );
    clearMarkup(refs.container);
    refs.ulList.innerHTML = list;
  }
}

function createMarkupForCounties({ name, flags }) {
  return `<li><img src =${flags.svg} alt='flags of ${name.official}' width=60 height=40/><p>${name.official}</p></li>`;
}

function createMarkupForCounty({
  name,
  capital,
  population,
  flags,
  languages,
}) {
  return `<img src =${flags.svg} alt='flags of ${
    name.official
  }' width=100% height=80/> <p>${name.official}</p>
	<ul class="porps"><li>Capital: ${capital}</li><li>Population: ${population}</li><li>Languages: ${Object.values(
    languages
  )}</li>
	</ul>`;
}

function clearMarkup(element) {
  return (element.innerHTML = '');
}
