import {ESCAPE_CODE, body} from './util.js';

const photoUpload = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const closeEditingButton = document.querySelector('#upload-cancel');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const openEditingPhoto = (evt) => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  imgUploadPreview.src = URL.createObjectURL(evt.target.files[0]);
  document.addEventListener('keydown', onImgEditingKeydown);
};

const closeEditingPhoto = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  photoUpload.value = '';
  document.removeEventListener('keydown', onImgEditingKeydown);
};

photoUpload.addEventListener('change', openEditingPhoto);

closeEditingButton.addEventListener('click', closeEditingPhoto);

function onImgEditingKeydown (evt) {
  if (evt.key !== ESCAPE_CODE) {
    return;
  }
  evt.preventDefault();
  closeEditingPhoto();
}

