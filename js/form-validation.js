const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const HASHTAG_LENGTH = 20;
const HASHTAGS_COUNT = 5;
const lettersNumbersRegex = /^#[A-Za-zА-Яа-яЁё0-9]*$|(^$)/;

//Функция проверки массива на повторяющиеся элементы
const hasDuplicates = (array) => (new Set(array)).size !== array.length;

hashtagsInput.addEventListener('input', () => {
  //Перевести вводимое значение в нижний регистр и запретить более одного пробела
  hashtagsInput.value = hashtagsInput.value.toLowerCase().replace(/\s+/g, ' ');
  //Перевести строковое значение инпута в массив с разделителями в виде пробела
  const hashtagsArray = hashtagsInput.value.split(' ');
  const errorsArray = [];
  //Проверить каждый элемент массива
  hashtagsArray.forEach((tag) => {
    //Проверить каждый хэштег на то, с какого символа он начинается
    if (!tag.startsWith('#')) {
      errorsArray.push('Хэштеги должны начинаться с "#" и отделяться друг от друга пробелами.');
    }
    //Разрешить отправку, если строка пуста
    if (tag === '') {
      errorsArray.length = 0;
    }
    //Проверить каждый хэштег на то, не состоит ли он только из решетки
    if (tag === '#') {
      errorsArray.push('Хэштег не должен состоять только из знака "#"');
    }
    //Проверить каждый хэштег на то, не содержит ли он спецсимволов
    if (!lettersNumbersRegex.test(tag)) {
      errorsArray.push('Хэштеги должны состоять из букв и чисел и не могут содержать спецсимволы.');
    }
    //Проверить каждый хэштег на то, проходит ли он по длине
    if (tag.length > HASHTAG_LENGTH) {
      errorsArray.push(`Хэштег не может быть длиннее ${HASHTAG_LENGTH} символов.`);
    }
    //Проверить функцией массив на предмет повторения хэштегов
    if (hasDuplicates(hashtagsArray) === true) {
      errorsArray.push('Нельзя указывать повторяющиеся хэштеги');
    }
    //Проверить количество хештегов и разрешить шестой хэштег отправить пустым
    if (hashtagsArray.length > HASHTAGS_COUNT && hashtagsArray[HASHTAGS_COUNT] !== '') {
      errorsArray.push(`Нельзя добавить более ${HASHTAGS_COUNT} хэштегов`);
    }
  });
  //Запретить пробел в самом начале ввода и удалить стили
  if (hashtagsArray[0] === '') {
    hashtagsInput.value = hashtagsInput.value.trim();
    hashtagsInput.classList.remove('text__hashtags--invalid');
    hashtagsInput.classList.remove('text__hashtags--valid');
    hashtagsInput.setCustomValidity('');
  } else if (errorsArray.length === 0) {
    hashtagsInput.classList.remove('text__hashtags--invalid');
    hashtagsInput.classList.add('text__hashtags--valid');
    hashtagsInput.setCustomValidity('');
  } else {
    hashtagsInput.classList.remove('text__hashtags--valid');
    hashtagsInput.classList.add('text__hashtags--invalid');
    hashtagsInput.setCustomValidity(errorsArray[0]);
  }
  //Заставить браузер проверять валидность поля на каждый ввод символа
  hashtagsInput.reportValidity();
});

//Валидация поля комментария
commentInput.addEventListener('change', () => {
  if (commentInput.value === '') {
    commentInput.classList.remove('text__description--valid');
  } else {
    commentInput.classList.add('text__description--valid');
  }
  commentInput.value = commentInput.value.replace(/\s+/g, ' ').trim();
});

export {hashtagsInput, commentInput};
