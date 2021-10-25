import {imgUploadPreview} from './popup-editing.js';

const scaleControlValue = document.querySelector('.scale__control--value');
const SCALE_STEP = 0.25;
const SCALE_MIN = 0.25;
const SCALE_MAX = 1;
// const re = /(\d+\.\d+)|(\d+)/;

const zoomOutPhoto = () => {
  const scaleValue = +scaleControlValue.value.replace(/[^0-9]/g, '') / 100;
  if (scaleValue !== SCALE_MIN) {
    imgUploadPreview.style.transform = `scale(${scaleValue - SCALE_STEP})`;
    scaleControlValue.value = `${(scaleValue - SCALE_STEP) * 100}%`;
  }
};

const zoomInPhoto = () => {
  const scaleValue = +scaleControlValue.value.replace(/[^0-9]/g, '') / 100;
  if (scaleValue !== SCALE_MAX) {
    imgUploadPreview.style.transform = `scale(${scaleValue + SCALE_STEP})`;
    scaleControlValue.value = `${(scaleValue + SCALE_STEP) * 100}%`;
  }
};

export {zoomInPhoto, zoomOutPhoto};
