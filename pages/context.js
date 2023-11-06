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
      return { ...state, count: state.count + 1};
    case 'DECREMENT':
      return { ...state, count: state.count - 1};
    case 'P_TABLE_NAME':
      const newTable = { name: action.name, value: action.value };
      // 创建一个新的Tables数组，包含旧数组中的元素以及新的表格对象
      const newTables = [...state.Tables, newTable];
      return { ...state, Tables: newTables };
    case 'SET_PORT':
      return { ...state, Port: action.port };
    case 'SET_PORJECTNAME':
      return { ...state, ProjectName: action.projectname };
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

