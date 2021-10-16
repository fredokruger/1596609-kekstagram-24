import {photoDescriptions} from './descriptions-list.js';
import {openFullPhoto} from './full-photo.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');

//Функция создания миниатюры и подвешивание события на каждую
const createGallery = (item) => {
  const copyPictureTemplate = pictureTemplate.cloneNode(true);
  copyPictureTemplate.querySelector('.picture__img').src = item.url;
  copyPictureTemplate.querySelector('.picture__likes').textContent = item.likes;
  copyPictureTemplate.querySelector('.picture__comments').textContent = item.comments.length;
  pictureContainer.append(copyPictureTemplate);
  //Привязка события к каждой миниатюре с помощью замыкания
  copyPictureTemplate.addEventListener('click', (evt) => {
    evt.preventDefault();
    //вызов функции открытия большого фото
    openFullPhoto(item);
  });
};

photoDescriptions.forEach(createGallery);

