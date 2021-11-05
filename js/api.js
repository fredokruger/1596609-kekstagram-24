const getServerData = (onFail, ...onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data',
    {
      method: 'GET',
      credintials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail();
      }
    })
    .then((data) => {
      onSuccess.forEach((func) => func(data));
    })
    .catch(() => {
      onFail();
    });
};

const sendServerData = (onSuccess, onFail, body, closeForm) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      credentials: 'same-origin',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    })
    .finally(() => closeForm());
};

export {getServerData, sendServerData};

