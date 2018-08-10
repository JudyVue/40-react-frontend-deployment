import { cookieFetch } from '../lib/utils';

const TOKEN_COOKIE_KEY = 'X-401d25-Token';
// const token = localStorage['app-token'];

if (window.location.hash) {
  console.log('did we get inside here at all?');
  const hashUrlToken = window.location.hash.slice(1);
  document.cookie = `${TOKEN_COOKIE_KEY}=${hashUrlToken}`;
}
const token = cookieFetch(TOKEN_COOKIE_KEY);
// token = token !== 'null' ? token : null;

console.log(window.location.hash, 'inside reducer')
console.log(token, 'inside redcuer?')
// the setting of this state enables us to stay logged in if our cookie is in the browser
const initialState = token || null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOKEN_SET':
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default: 
      return state;
  }
};
