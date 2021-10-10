//Функция, возвращающая целое число из диапазона
const chooseNumber = (min, max) => Math.floor(Math.random() * (Math.max(Math.abs(min), Math.abs(max)) + 1 - Math.min(Math.abs(min), Math.abs(max))) + Math.min(Math.abs(min), Math.abs(max)));

//Функция, проверяющая длину строки относительно максимально возможной
// const checkLength = (checkedString, MAX_LENGTH) => checkedString.length <= MAX_LENGTH;
// checkLength();

const PHOTO_ARRAY_LENGTH = 25;
const MIN_COMMENT_LENGTH = 1;
const MAX_COMMENT_LENGTH = 11;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

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

//Функция создания объекта с данными о комментарии
const createComment = () => {
  const commentPerson = chooseNumber(1, Object.keys(COMMENT_NAME).length);
  const commentInfo = {
    avatar: `img/avatar-${  commentPerson  }.svg`,
    name: COMMENT_NAME[commentPerson],
    message: COMMENT_TEXT[chooseNumber(0,(COMMENT_TEXT.length-1))],
  };
  return commentInfo;
};

let photoOrder = 1;
//Функция создания объекта с описанием фотографии
const createDescription = () => {
  const descriptionInfo = {
    id: photoOrder,
    url: `photos/${  photoOrder  }.jpg`,
    description: `Описание фотографии ${  photoOrder}`,
    likes: chooseNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments : Array.from({length: chooseNumber(MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH)}, createComment),
  };
  let commentOrder = 1;
  descriptionInfo.comments.forEach((value) => {
    value.id = parseInt((`${descriptionInfo.id.toString(10)  }0${  commentOrder.toString(10)}`), 10);
    commentOrder++;
  });
  photoOrder++;
  return descriptionInfo;
};

const photoDescriptions = Array.from({length:PHOTO_ARRAY_LENGTH}, createDescription);
photoDescriptions();

