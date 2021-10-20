import {photoDescriptions} from './descriptions-list.js';
import {openFullPhoto} from './full-photo.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
//Регулярное выражение для поиска айди в картинке
const re = /\/photos\/(\d+)\.jpg/;
//Функция создания миниатюры
const createGallery = (item) => {
  const copyPictureTemplate = pictureTemplate.cloneNode(true);
  copyPictureTemplate.querySelector('.picture__img').src = item.url;
  copyPictureTemplate.querySelector('.picture__likes').textContent = item.likes;
  copyPictureTemplate.querySelector('.picture__comments').textContent = item.comments.length;
  picturesContainer.append(copyPictureTemplate);
};

//Привязка события к миниатюрам при помощи делегирования
picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    //вызов функции открытия большого фото с аргументом в виде элемента из исходного массива
    //с помощью регулярного выражения вытаскивается айди текущей картинки и вставляется индексом в исходный массив с вычетом единицы
    openFullPhoto(photoDescriptions[evt.target.closest('.picture').querySelector('.picture__img').src.match(re)[1]-1]);
  }
});
photoDescriptions.forEach(createGallery);

