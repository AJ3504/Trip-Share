const SHOW_USER = 'SHOW_USER';

export const showUser = (payload) => {
  return {
    type: SHOW_USER,
    payload
  };
};

const initialState = { isLogin: false, user: '', users: [] };

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export default logReducer;
