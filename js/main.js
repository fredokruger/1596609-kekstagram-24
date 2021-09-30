//Функция, возвращающая целое число из диапазона
const chooseNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return;
  }
  return Math.floor(Math.random() * (Math.max(min, max) + 1 - Math.min(min, max)) + Math.min(min, max));
};

chooseNumber();

//Функция, проверяющая длину строки относительно максимально возможной
const checkLength = (checkedString, MAX_LENGTH) => checkedString.length <= MAX_LENGTH;

checkLength();
