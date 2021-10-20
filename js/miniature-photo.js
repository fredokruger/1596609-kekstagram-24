import {photoDescriptions} from './descriptions-list.js';
import {openFullPhoto} from './full-photo.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
// Живая коллекция миниатюр
const miniPictures =  document.getElementsByClassName('picture__img');
// console.log(miniPictures);

//Функция создания миниатюры и подвешивание события на каждую
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
    const miniPicturesArray = [...miniPictures];
    //вызов функции открытия большого фото с аргументом в виде элемента из исходного массива
    openFullPhoto(photoDescriptions[miniPicturesArray.indexOf(evt.target)]);
  }
});

photoDescriptions.forEach(createGallery);

