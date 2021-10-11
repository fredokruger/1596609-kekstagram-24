//Функция, возвращающая целое число из диапазона
const chooseNumber = (min, max) => Math.floor(Math.random() * (Math.max(Math.abs(min), Math.abs(max)) + 1 - Math.min(Math.abs(min), Math.abs(max))) + Math.min(Math.abs(min), Math.abs(max)));
export {chooseNumber};
