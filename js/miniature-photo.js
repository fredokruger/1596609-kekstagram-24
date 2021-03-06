import {openFullPhoto} from './full-photo.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const filtersContainer = document.querySelector('.img-filters');

//Функция создания миниатюр из данных с сервера
const createGallery = (array) => {
  //Найти и удалить все миниатюры
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
  array.forEach((item) => {
    const copyPictureTemplate = pictureTemplate.cloneNode(true);
    copyPictureTemplate.querySelector('.picture__img').src = item.url;
    copyPictureTemplate.querySelector('.picture__img').dataset.indexNumber = `${item.id}`;
    copyPictureTemplate.querySelector('.picture__likes').textContent = `${item.likes}`;
    copyPictureTemplate.querySelector('.picture__comments').textContent = `${item.comments.length}`;
    picturesContainer.append(copyPictureTemplate);
  });
  filtersContainer.classList.remove('img-filters--inactive');
};

//Привязка события к миниатюрам при помощи делегирования
const createMiniatureEvent = (array) => {
  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();
      //Дата атрибут текущей фотографии
      const currentPhotoDataId = evt.target.closest('.picture').querySelector('.picture__img').dataset.indexNumber;
      //вызов функции открытия большого фото с аргументами в виде элемента из исходного массива и индекса этого элемента
      openFullPhoto(array[currentPhotoDataId]);
    }
  });
};

export {createGallery, createMiniatureEvent};
