import {chooseRandomNumber, debounce} from './util.js';
import {createGallery} from './miniature-photo.js';

const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFiltersButtons = document.querySelectorAll('.img-filters__button');
const RANDOM_PHOTOS_COUNT = 10;
const DELAY_TIME = 500;

const showRandomPhotos = (copyArray) => {
  for (let index = copyArray.length - 1; index > 0; index--) {
    const randomIndex = chooseRandomNumber(0, copyArray.length - 1);
    [copyArray[index], copyArray[randomIndex]] = [copyArray[randomIndex], copyArray[index]];
  }
  return copyArray.slice(0,RANDOM_PHOTOS_COUNT);
};

const showDiscussedPhotos = (copyArray) => {
  copyArray.sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);
  return copyArray;
};


const shufflePhotos = (array) => {
  let shuffleArray = [];
  const delayRendering = debounce(createGallery, DELAY_TIME);
  imgFiltersForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    //Удалить активный класс у кнопок
    imgFiltersButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    //Создать копию исходного массива
    const copyArray = array.slice();
    //Создать переменную для преобразованного массива
    if (evt.target.matches('#filter-default')) {
      shuffleArray = array;
      evt.target.classList.add('img-filters__button--active');
    }
    if (evt.target.matches('#filter-random')) {
      shuffleArray = showRandomPhotos(copyArray);
      evt.target.classList.add('img-filters__button--active');
    }
    if (evt.target.matches('#filter-discussed')) {
      shuffleArray = showDiscussedPhotos(copyArray);
      evt.target.classList.add('img-filters__button--active');
    }
    delayRendering(shuffleArray);
  });
};

export {shufflePhotos};
