export const TOGGLE_THEME_MODE = "TOGGLE_THEME_MODE";
export const SET_DARK_MODE = "SET_DARK_MODE";
export const SET_LIGHT_MODE = "SET_LIGHT_MODE";
export const SET_LOGIN_INFO = "SET_LOGIN_INFO";
export default (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME_MODE:
      return {
        ...state,
        darkMode: !state.darkMode
      };
    case SET_DARK_MODE:
      return {
        ...state,
        darkMode: true
      };
    case SET_LIGHT_MODE:
      return {
        ...state,
        darkMode: false
      };
    case SET_LOGIN_INFO:
      return {
        ...state,
        currentUser: action.payload
      };
  }
};
