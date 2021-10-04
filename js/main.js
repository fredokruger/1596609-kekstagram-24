//Функция, возвращающая целое число из диапазона
const chooseNumber = (min, max) => Math.floor(Math.random() * (Math.max(Math.abs(min), Math.abs(max)) + 1 - Math.min(Math.abs(min), Math.abs(max))) + Math.min(Math.abs(min), Math.abs(max)));

//Функция, проверяющая длину строки относительно максимально возможной
// const checkLength = (checkedString, MAX_LENGTH) => checkedString.length <= MAX_LENGTH;

// checkLength();

const COMMENT_NAME = {
  1 : 'Артем',
  2 : 'Дмитрий',
  3 : 'Елена',
  4 : 'Игорь',
  5 : 'Олег',
  6 :'Анастасия',
};

const COMMENT_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

//Функция создания массива айдишников по порядку
const collectId = (quantity) => {
  const identifiers = [];
  for (let index=1; index<= quantity; index++) {
    identifiers.push(index);
  }
  return identifiers;
};

//Функция создания объекта с данными о комментарии
const createComment = () => {
  const commentPerson = chooseNumber(1, Object.keys(COMMENT_NAME).length);
  const commentInfo = {
    // eslint-disable-next-line prefer-template
    avatar: 'img/avatar-' + commentPerson + '.svg',
    name: COMMENT_NAME[commentPerson],
    message: COMMENT_TEXT[chooseNumber(0,(COMMENT_TEXT.length-1))],
  };
  return commentInfo;
};

//Функция создания объекта с описанием фотографии
let photoOrder = 0;
const createDescription = () => {
  const descriptionInfo = {
    id: collectId(25)[photoOrder],
    // eslint-disable-next-line prefer-template
    url: 'photos/' + collectId(25)[photoOrder] + '.jpg',
    // eslint-disable-next-line prefer-template
    description: 'Описание фотографии ' + collectId(25)[photoOrder],
    likes: chooseNumber(15,200),
    comments : Array.from({length: chooseNumber(1,11)}, createComment),
  };
  let commentOrder = 1;
  descriptionInfo.comments.forEach((value) => {
    // eslint-disable-next-line prefer-template
    value.id =parseInt((descriptionInfo.id.toString(10) + '0' + commentOrder.toString(10)),10);
    commentOrder++;
  });
  photoOrder++;
  return descriptionInfo;
};

const photoDescriptions = Array.from({length:25}, createDescription);
// eslint-disable-next-line no-console
console.log(photoDescriptions);

