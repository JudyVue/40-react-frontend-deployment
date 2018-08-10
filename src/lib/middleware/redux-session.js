export default store => next => (action) => {
  const result = next(action); // we must invoke next to make sure the chain completes

  const reduxStore = store.getState();
  console.log('SESSION MIDDLEWARE', reduxStore);

  // TODO: add cookie here
  if (reduxStore.token) {
    document.cookie = `X-401d25-Token=${reduxStore.token};`;
  }
  // HERE: change is made to set cookie
  // we save properties of our redux store to localstorage

  // localStorage['app-token'] = reduxStore.token;
  // for (const key in reduxStore) { // eslint-disable-line
  //   if (!localStorage[key]) {
  //     localStorage[key] = JSON.stringify(reduxStore[key]);
  //   }
  // }
  return result;
};
