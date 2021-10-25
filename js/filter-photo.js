import {imgUploadPreview} from './popup-editing.js';

const filterRadioButtons = document.querySelector('.effects__list');

filterRadioButtons.addEventListener('change', (evt) => {
  imgUploadPreview.className = '';
  if (evt.target.matches('#effect-chrome')) {
    imgUploadPreview.classList.add('effects__preview--chrome');
  }
  if (evt.target.matches('#effect-sepia')) {
    imgUploadPreview.classList.add('effects__preview--sepia');
  }
  if (evt.target.matches('#effect-marvin')) {
    imgUploadPreview.classList.add('effects__preview--marvin');
  }
  if (evt.target.matches('#effect-phobos')) {
    imgUploadPreview.classList.add('effects__preview--phobos');
  }
  if (evt.target.matches('#effect-heat')) {
    imgUploadPreview.classList.add('effects__preview--heat');
  }
});

