
const getScrollbarWidth = () => {
  //Создать невидимый контейнер
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);
  //Создать внутренний элемент и добавить в контейнер
  const inner = document.createElement('div');
  outer.appendChild(inner);
  //Посчитать разницу между шириной контейнера и шириной ребенка
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  //Удалить созданные элементы
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;

};

export {getScrollbarWidth};
