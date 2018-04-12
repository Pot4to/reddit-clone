const viewReducer = (state = 'feed', action) => {
  switch(action.type) {
    case "CHANGE_VIEW": {
      return Object.assign({}, state, )
      state = {...state, view: action.payload}
      break;
    }
  }
  return state;
};

export default viewReducer;