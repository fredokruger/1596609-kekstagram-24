import {photoDescriptions} from './descriptions-list.js';
import {openFullPhoto} from './full-photo.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

//Функция создания миниатюры
const createGallery = (item, index) => {
  const copyPictureTemplate = pictureTemplate.cloneNode(true);
  copyPictureTemplate.querySelector('.picture__img').src = item.url;
  copyPictureTemplate.querySelector('.picture__img').dataset.indexNumber = index;
  copyPictureTemplate.querySelector('.picture__likes').textContent = item.likes;
  copyPictureTemplate.querySelector('.picture__comments').textContent = item.comments.length;
  picturesContainer.append(copyPictureTemplate);
};

//Привязка события к миниатюрам при помощи делегирования
picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    //Дата атрибут текущей фотографии
    const currenPhotoDataId = evt.target.closest('.picture').querySelector('.picture__img').dataset.indexNumber;
    //вызов функции открытия большого фото с аргументами в виде элемента из исходного массива и индекса этого элемента
    openFullPhoto(photoDescriptions[currenPhotoDataId], currenPhotoDataId);
  }
});
photoDescriptions.forEach(createGallery);
