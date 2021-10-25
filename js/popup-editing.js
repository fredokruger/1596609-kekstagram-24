import {ESCAPE_CODE, body} from './util.js';
import {hashtagsInput, commentInput, onFormSubmit} from './form-validation.js';
import {getScrollbarWidth} from './scrollbar-width.js';
import {zoomInPhoto, zoomOutPhoto, scaleControlSmaller, scaleControlBigger, SCALE_DEFAULT} from './scale-photo.js';

const photoUpload = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const closeEditingButton = document.querySelector('#upload-cancel');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const buttonFormSubmit = document.querySelector('.img-upload__submit');
const minPhoto = document.querySelectorAll('.effects__preview');
const effectLevelScale = document.querySelector('.effect-level');

const closeEditingPhoto = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onImgEditingKeydown);
  closeEditingButton.removeEventListener('click', closeEditingPhoto);
  buttonFormSubmit.removeEventListener('change', onFormSubmit);
  scaleControlSmaller.removeEventListener('click', zoomOutPhoto);
  scaleControlBigger.removeEventListener('click', zoomInPhoto);
  imgUploadPreview.style.transform = `scale(${SCALE_DEFAULT})`;
  photoUpload.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = '';
  hashtagsInput.classList.remove('text__hashtags--invalid');
  hashtagsInput.classList.remove('text__hashtags--valid');
  commentInput.classList.remove('text__description--valid');
  body.style.marginRight = '';
};

const openEditingPhoto = (evt) => {
  const userPhoto = URL.createObjectURL(evt.target.files[0]);
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  body.style.marginRight = `${getScrollbarWidth()}px`;
  imgUploadPreview.src = userPhoto;
  effectLevelScale.style.display = 'none';
  minPhoto.forEach((element) => {element.style.backgroundImage = `url(${userPhoto})`;});
  document.addEventListener('keydown', onImgEditingKeydown);
  closeEditingButton.addEventListener('click', closeEditingPhoto);
  buttonFormSubmit.addEventListener('change', onFormSubmit);
  scaleControlSmaller.addEventListener('click', zoomOutPhoto);
  scaleControlBigger.addEventListener('click', zoomInPhoto);
};

photoUpload.addEventListener('change', openEditingPhoto);

function onImgEditingKeydown (evt) {
  //Отменить закрытие попапа, если фокус на полях ввода или клавиша не escape
  if (evt.key !== ESCAPE_CODE || evt.target.closest('.img-upload__text')) {
    return;
  }
  evt.preventDefault();
  closeEditingPhoto();
}

export {imgUploadPreview};
