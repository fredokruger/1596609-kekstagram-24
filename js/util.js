const ESCAPE_CODE = 'Escape';
const body = document.body;
const alertBlock = document.querySelector('#alert').content.querySelector('.alert');

const showAlert = () => {
  alertBlock.textContent = 'Не удалось получить данные с сервера';
  body.append(alertBlock);
};

export {ESCAPE_CODE, body, showAlert};
