export default store => next => action => {

  try {
    console.log("__STATE__", store.getState());
    next(action);
  }
  catch(err) {
    err.action = action;
    console.log('__ACTION__', action);
    console.error('__ERROR__', err.message);
    return err;
  }
}
