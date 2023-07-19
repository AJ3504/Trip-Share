const SHOW_USER = 'SHOW_USER';
// 현재 로그인한 유저의 정보

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
