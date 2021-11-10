import {ESCAPE_CODE, body, FILE_TYPES, showAlert} from './util.js';
import {hashtagsInput, commentInput, commentLengthCurrent, onFormSubmit} from './form-validation.js';
import {getScrollbarWidth} from './scrollbar-width.js';
import {zoomInPhoto, zoomOutPhoto} from './scale-photo.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const photoUpload = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const closeEditingButton = document.querySelector('#upload-cancel');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const photoLoaderModal = document.querySelector('#messages').content.querySelector('.img-upload__message');
//Константы для фильтров
const minPhoto = document.querySelectorAll('.effects__preview');
const effectLevel = document.querySelector('.effect-level__value');
const effectLevelScale = document.querySelector('.effect-level');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');


const closeEditingPhoto = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onImgEditingKeydown);
  closeEditingButton.removeEventListener('click', closeEditingPhoto);
  scaleControlSmaller.removeEventListener('click', zoomOutPhoto);
  scaleControlBigger.removeEventListener('click', zoomInPhoto);
  imgUploadPreview.style.transform = '';
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = '';
  imgUploadPreview.src = '';
  minPhoto.forEach((element) => element.style.backgroundImage = '');
  commentLengthCurrent.textContent = '0';
  hashtagsInput.setCustomValidity('');
  hashtagsInput.classList.remove('text__hashtags--invalid');
  hashtagsInput.classList.remove('text__hashtags--valid');
  commentInput.classList.remove('text__description--valid');
  body.style.marginRight = '';
  imgUploadForm.removeEventListener('submit', onFormSubmit);
  imgUploadForm.reset();
};

const openEditingPhoto = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  body.style.marginRight = `${getScrollbarWidth()}px`;
  effectLevelScale.style.display = 'none';
  document.addEventListener('keydown', onImgEditingKeydown);
  closeEditingButton.addEventListener('click', closeEditingPhoto);
  scaleControlSmaller.addEventListener('click', zoomOutPhoto);
  scaleControlBigger.addEventListener('click', zoomInPhoto);
  imgUploadForm.addEventListener('submit', onFormSubmit);
};


const setPreviewImage = (evt) => {
  const userPhoto = evt.target.files[0];
  const userPhotoUrl = URL.createObjectURL(userPhoto);
  const userPhotoName = userPhoto.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => userPhotoName.endsWith(item));
  imgUploadPreview.addEventListener('load', () => {
    photoLoaderModal.remove();
    openEditingPhoto(),
    { once: true };
  });
  if (matches) {
    body.append(photoLoaderModal);
    imgUploadPreview.src = userPhotoUrl;
    minPhoto.forEach((element) => element.style.backgroundImage = `url(${imgUploadPreview.src})`);
  } else {
    showAlert('Неподдерживаемый формат изображения. Загрузите другое изображение');
  }
};

photoUpload.addEventListener('change', setPreviewImage);

function onImgEditingKeydown (evt) {
  //Отменить закрытие попапа, если фокус на полях ввода или клавиша не escape
  if (evt.key !== ESCAPE_CODE || evt.target.closest('.img-upload__text')) {
    return;
  }
  evt.preventDefault();
  closeEditingPhoto();
}

export {imgUploadPreview, effectLevel, effectLevelScale, closeEditingPhoto};
