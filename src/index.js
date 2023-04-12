import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const promise = new Promise((resolve, reject) => {
  const canFull = Math.random() > 1;

  setTimeout(() => {
    if (canFull) {
      resolve(`Сработал пропис`);
    }
    reject(`промис реджектнулся ошибка ебаный рот`);
  }, 3000);
});

function ready(resolve) {
  console.log(`здарвоа это ${resolve}`);
}

function fail(reject) {
  console.log(`ошибка бля ${reject}`);
}
