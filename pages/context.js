import { createContext, useContext, useReducer } from 'react';

const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};

const initialState = {
  count: 0,
  ProjectName: "",
  Port: 0,
  TableCount: 0,
  Tables:[]
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1,num: state.num };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 ,num: state.num};
    case 'GETALL':
      console.log("qq",state)
      return { ...state};
    default:
      return state;
  }
};

export const MyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>
  );
};

