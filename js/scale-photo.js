import {imgUploadPreview} from './popup-editing.js';

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const SCALE_STEP = 0.25;
const SCALE_MIN = 0.25;
const SCALE_MAX = 1;
const SCALE_DEFAULT = 1;
const re = /(\d+\.\d+)|(\d+)/;

const zoomOutPhoto = () => {
  if (imgUploadPreview.style.transform !== `scale(${SCALE_MIN})`) {
    imgUploadPreview.style.transform = `scale(${+imgUploadPreview.style.transform.match(re)[0] - SCALE_STEP})`;
    scaleControlValue.value = `${imgUploadPreview.style.transform.match(re)[0] * 100}%`;
  }
};

const zoomInPhoto = () => {
  if (imgUploadPreview.style.transform !== `scale(${SCALE_MAX})`) {
    imgUploadPreview.style.transform = `scale(${+imgUploadPreview.style.transform.match(re)[0] + SCALE_STEP})`;
    scaleControlValue.value = `${imgUploadPreview.style.transform.match(re)[0] * 100}%`;
  }
};

export {zoomInPhoto, zoomOutPhoto, scaleControlSmaller, scaleControlBigger, SCALE_DEFAULT};
