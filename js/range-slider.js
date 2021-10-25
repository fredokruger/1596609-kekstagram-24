const rangeSlider = document.querySelector('.effect-level__slider');

noUiSlider.create(rangeSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
});
