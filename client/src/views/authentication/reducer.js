const initialState = {
  authError: null
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        authError: null
      };
    case "SIGN_UP_ERROR":
      return {
        ...state,
        authError: action.error.message
      };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        authError: null
      };
    case "SIGN_IN_ERROR":
      return {
        ...state,
        authError: action.error.message
      };
    case "SIGN_OUT_SUCCESS":
      return state;
    case "SIGN_OUT_ERROR":
      return {
        ...state,
        authError: action.error.message
      };
    default:
      return state;
  }
};
