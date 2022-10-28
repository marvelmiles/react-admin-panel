import { createContext, useReducer, useContext } from "react";
import reducer from "./reducer";
const INITIAL_STATE = {
  darkMode: false,
  currentUser: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null
};

export const stateContext = createContext(INITIAL_STATE);

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <stateContext.Provider value={{ state, dispatch }}>
      {children}
    </stateContext.Provider>
  );
};

export const useStateValue = () => useContext(stateContext);
