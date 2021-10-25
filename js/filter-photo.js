import {imgUploadPreview} from './popup-editing.js';

const filterRadioButtons = document.querySelector('.effects__list');
const rangeSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const effectLevelScale = document.querySelector('.effect-level');

noUiSlider.create(rangeSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

filterRadioButtons.addEventListener('change', (evt) => {
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = '';
  if (evt.target.matches('#effect-none')) {
    effectLevelScale.style.display = 'none';
  } else {
    effectLevelScale.style.display = '';
  }
  if (evt.target.matches('#effect-chrome')) {
    imgUploadPreview.classList.add('effects__preview--chrome');
    rangeSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
  if (evt.target.matches('#effect-sepia')) {
    imgUploadPreview.classList.add('effects__preview--sepia');
    rangeSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
  if (evt.target.matches('#effect-marvin')) {
    imgUploadPreview.classList.add('effects__preview--marvin');
    rangeSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }
  if (evt.target.matches('#effect-phobos')) {
    imgUploadPreview.classList.add('effects__preview--phobos');
    rangeSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
  if (evt.target.matches('#effect-heat')) {
    imgUploadPreview.classList.add('effects__preview--heat');
    rangeSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
});

rangeSlider.noUiSlider.on('update', (values, handle) => {
  effectLevel.value = values[handle];
  if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
    imgUploadPreview.style.filter = `grayscale(${values[handle]})`;
  }
  if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
    imgUploadPreview.style.filter = `sepia(${values[handle]})`;
  }
  if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
    imgUploadPreview.style.filter = `invert(${values[handle]}%)`;
  }
  if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
    imgUploadPreview.style.filter = `blur(${values[handle]}px)`;
  }
  if (imgUploadPreview.classList.contains('effects__preview--heat')) {
    imgUploadPreview.style.filter = `brightness(${values[handle]})`;
  }
});
