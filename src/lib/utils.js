const renderIf = (test, trueComponent, falseComponent = null) => {
  return test ? trueComponent : falseComponent;
};

const devLogger = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    return console.log(...args);
  }
  return null;
};

// TODO: cookies not until tomorrow

// I don't think I'm using this
const cookieFetch = (key) => {
  const cookies = document.cookie.split(';');
   for (const cookie of cookies) { // eslint-disable-line
    const [cookieKey, cookieValue] = cookie.split('=');
    
    if (key === cookieKey.trim()) {
      return cookieValue;
    }
  }
  return undefined;
};

// Standard way to delete a cookie: To delete a cookie, unset its value and pass a date in the past
const cookieDelete = (key) => {
  console.log('cookie delete', key)
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  // delete localStorage['app-token'];
};
export { renderIf, cookieDelete, cookieFetch, devLogger }; // eslint-disable-line