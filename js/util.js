const ESCAPE_CODE = 'Escape';
const body = document.body;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const alertBlock = document.querySelector('#alert').content.querySelector('.alert');

//Функция debounce
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    const callFunc = () => func.apply(this, args);
    clearTimeout(timeout);
    timeout = setTimeout(callFunc, delay);
  };
};

//Функция показа ошибки при получении данных с сервера
const showAlert = (message) => {
  alertBlock.textContent = message;
  body.append(alertBlock);
  setTimeout(() => alertBlock.remove(), 5000);
};

//Функция получения рандомного числа из дипазона
const chooseRandomNumber = (min, max) => Math.floor(Math.random() * (Math.max(Math.abs(min), Math.abs(max)) + 1 - Math.min(Math.abs(min), Math.abs(max))) + Math.min(Math.abs(min), Math.abs(max)));

export {ESCAPE_CODE, body, showAlert, FILE_TYPES, chooseRandomNumber, debounce};
