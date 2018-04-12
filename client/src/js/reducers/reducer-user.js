const userReducer = (state = '', action) => {
  switch(action.type) {
    case "ADD-USER": {
      return Object.assign({}, state, )
      state = {...state, user: action.payload}
      break;
    }
  }
  return state;
};

export default userReducer;