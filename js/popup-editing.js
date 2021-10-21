import {ESCAPE_CODE, body} from './util.js';
import {hashtagsInput, commentInput} from './form-validation.js';

const photoUpload = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const closeEditingButton = document.querySelector('#upload-cancel');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const closeEditingPhoto = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onImgEditingKeydown);
  closeEditingButton.removeEventListener('click', closeEditingPhoto);
  photoUpload.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';
  hashtagsInput.classList.remove('text__hashtags--invalid');
  hashtagsInput.classList.remove('text__hashtags--valid');
  commentInput.classList.remove('text__description--valid');
};

const openEditingPhoto = (evt) => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  imgUploadPreview.src = URL.createObjectURL(evt.target.files[0]);
  document.addEventListener('keydown', onImgEditingKeydown);
  closeEditingButton.addEventListener('click', closeEditingPhoto);
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

