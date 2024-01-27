const initialState = {
  isAuthenticated: false,
  authorize: null,
};

const oauthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        authorize: action.payload,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isAuthenticated: false,
        authorize: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        authorize: null,
      };
    default:
      return state;
  }
};

export default oauthReducer;
