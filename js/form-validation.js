const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const HASHTAG_LENGTH = 20;
const HASHTAGS_COUNT = 5;
const startRe = new RegExp('^#');
const onlyHashRe = new RegExp('^[#]{1}$');
const onlyLettersNumbersRe = new RegExp('^#[A-Za-zА-Яа-яЁё0-9]*$');
const stringLengthRe = new RegExp(`^#[A-Za-zА-Яа-яЁё0-9]{1,${HASHTAG_LENGTH - 1}}$`);
//Функция проверки массива на повторяющиеся элементы
const hasDuplicates = (array) => (new Set(array)).size !== array.length;

hashtagsInput.addEventListener('input', () => {
  //Перевести вводимое значение в нижний регистр и запретить более одного пробела
  hashtagsInput.value = hashtagsInput.value.toLowerCase().replace(/\s+/g, ' ');
  //Перевести строковое значение инпута в массив с разделителями в виде пробела
  const hashtagsArray = hashtagsInput.value.split(' ');
  //Проверить каждый элемент массива
  hashtagsArray.every((tag) => {
    //Добавить стили ошибки при начале ввода
    hashtagsInput.classList.remove('text__hashtags--valid');
    hashtagsInput.classList.add('text__hashtags--invalid');
    //Запретить пробел в самом начале ввода, убрать все стили и разрешить отправку при пустом значении
    if (hashtagsArray[0] === '') {
      hashtagsInput.value = hashtagsInput.value.trim();
      hashtagsInput.classList.remove('text__hashtags--invalid');
      hashtagsInput.classList.remove('text__hashtags--valid');
      hashtagsInput.setCustomValidity('');
      //При пробеле после хэштега разрешить отправку формы
    } else if (tag === '') {
      hashtagsInput.classList.remove('text__hashtags--invalid');
      hashtagsInput.classList.add('text__hashtags--valid');
      hashtagsInput.setCustomValidity('');
      //Проверить каждый хэштег на то, с какого символа он начинается
    } else if (!startRe.test(tag)) {
      hashtagsInput.setCustomValidity('Хэштеги должны начинаться с "#" и отделяться друг от друга пробелами.');
      //Проверить каждый хэштег на то, не состоит ли он только из решетки
    } else if (onlyHashRe.test(tag)) {
      hashtagsInput.setCustomValidity('Хэштеги не должен состоять только из знака "#"');
      //Проверить каждый хэштег на то, не содержит ли он спецсимволов
    } else if (!onlyLettersNumbersRe.test(tag)) {
      hashtagsInput.setCustomValidity('Хэштеги должны состоять из букв и чисел и не могут содержать спецсимволы.');
      //Проверить каждый хэштег на то, проходит ли он по длине
    } else if (!stringLengthRe.test(tag)) {
      hashtagsInput.setCustomValidity(`Хэштег не может быть длиннее ${HASHTAG_LENGTH} символов.`);
      //Проверить функцией массив на предмет повторения хэштегов
    } else if (hasDuplicates(hashtagsArray) === true) {
      hashtagsInput.setCustomValidity('Нельзя указывать повторяющиеся хэштеги');
      //Проверить количество хештегов и разрешить пробел после последнего допустимого
    } else if (hashtagsArray.length > HASHTAGS_COUNT && hashtagsArray[HASHTAGS_COUNT] !== '') {
      hashtagsInput.setCustomValidity(`Нельзя добавить более ${HASHTAGS_COUNT} хэштегов`);
      //Если все проверки пройдены задать стили правильного ввода, разрешить отправку формы и вернуть true из функции
    }  else {
      hashtagsInput.setCustomValidity('');
      hashtagsInput.classList.remove('text__hashtags--invalid');
      hashtagsInput.classList.add('text__hashtags--valid');
      return true;
    }
    //Заставить браузер проверять валидность поля на каждый ввод символа
    hashtagsInput.reportValidity();
  });
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
