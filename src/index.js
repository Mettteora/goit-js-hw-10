import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector(`#search-box`),
  ulList: document.querySelector(`.country-list`),
  container: document.querySelector(`.country-info`),
};

refs.input.addEventListener(`input`, debounce(searchC, DEBOUNCE_DELAY));

function searchC(e) {
  e.preventDefault();
  const search = refs.input.value;
  console.log(search);

  function fetchCountries(search) {
    fetch(`https://restcountries.com/v3.1/name/${search}`)
      .then(response => {
        return response.json();
      })
      .then(country => {
        console.log(country);
        console.log();
        const markupTest = render(country);
        console.log(markupTest);
      })
      .then(render)
      .catch(error => {
        console.log(error);
      });
  }

  function render(country) {
    const markup = `(<div>
      <img src="{{flag.png}}" alt="" />
      <h3>{{ capital }}</h3>
    </div>)`(country);
    refs.container.innerHTML = markup;
  }

  fetchCountries(search);
}

// import './css/styles.css';
// import Notiflix from 'notiflix';
// const DEBOUNCE_DELAY = 300;
// const refs = {
//   input: document.querySelector(`#search-box`),
//   ulList: document.querySelector(`.country-list`),
//   container: document.querySelector(`.country-info`),
// };

// refs.input.addEventListener(`input`, searchC);

// function searchC(e) {
//   e.preventDefault();
//   const form = e.currentTarget;
//   const search = refs.input.value;
//   console.log(search);

//   function fetchCountries(search) {
//     const resp = fetch(`https://restcountries.com/v3.1/name/${name}`)
//       .then(Response => {
//         return Response.json();
//       })
//       .then(country => {
//         console.log(country);
//         console.log();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
// }
