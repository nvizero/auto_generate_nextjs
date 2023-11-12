import { createContext, useContext, useReducer } from 'react';
import $ from 'jquery';
import axios from 'axios'; // Make sure to import axios
const MyContext = createContext();
export const useMyContext = () => {
  return useContext(MyContext);
};

const initialState = {
  ProjectName: "",
  Port: 0,
  TableCount: 0,
  Tables:[]
};

function getFormValues(tableName, count) {
  const formValues = [];
  for (let i = 1; i <= count; i++) {
    const fieldName = `form_${tableName}_${i}`;
    const value = $(`form#${fieldName}`).serialize();/* 在此处获取表单字段的值，例如通过 DOM 操作或其他方式 */;
    formValues.push({ [fieldName]: value });
  }
  return formValues;
}

const handleAllData = async (data) => { // Make sure to mark this function as async
  let responses = [];
  try{
    let project = {
      name: data.ProjectName,
      port: parseInt(data.Port), // Corrected this line, assuming you want to use data.Port
      state:data,
      tables:data.Tables,
    };
    const response = await axios.post('/api/submit', project);
    data.Tables.forEach((table) =>{
        data[table.name].forEach( async rowData =>{
          try{
            let tableData = {"name":table.value , "attr" : rowData,"id":response.data.id};
            let tstate = await axios.post('/api/createtable', tableData);
            console.log("----------",tstate);
          } catch (error) {
            console.error('Error:', error);
          }
        })
      } 
    );
    await axios.post('/api/generate');

    console.log(response);
  } catch (error) {
    console.error('Full error:', error);
  }
  return responses;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, TableCount: action.count};
    case 'DECREMENT':
      return { ...state};
    case 'P_TABLE_NAME':
      const newTable = { name: action.name, 
                         value: action.value,
                         field_count: action.field_count };
      // 创建一个新的Tables数组，包含旧数组中的元素以及新的表格对象
      const form_result = getFormValues(action.name, action.field_count);
      const newTables = [...state.Tables, newTable];
      return { ...state, Tables: newTables, [action.name]:form_result };
    case 'SET_PORT':
      return { ...state, Port: action.port };
    case 'SET_PORJECTNAME':
      return { ...state, ProjectName: action.projectname };
    case 'POST_ALL':
      (async () => {
          try {
            const ee = await handleAllData(state);
            console.log("eeeeeeeeeeeee",ee);
          } catch (error) {
            console.error('Error in handleAllData:', error);
          }
      })();
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

