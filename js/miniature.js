import {photoDescriptions} from './descriptions-list.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');

const createMiniature = (item) => {
  const copyPictureTemplate = pictureTemplate.cloneNode(true);
  copyPictureTemplate.querySelector('.picture__img').src = item.url;
  copyPictureTemplate.querySelector('.picture__likes').textContent = item.likes;
  copyPictureTemplate.querySelector('.picture__comments').textContent = item.comments.length;
  pictureContainer.append(copyPictureTemplate);
};

photoDescriptions.forEach((photoDescription) => {
  createMiniature(photoDescription);
});


