import React, { useState } from 'react';
import Field from './field';
import { useMyContext } from './context';

export default function Table(props) {
  const { state, dispatch } = useMyContext();
  const [field_count, setFieldCount] = useState(0); // 使用状态管理输入框的值
  const [field, setField] = useState([]);
  const [tablename, setTablename] = useState('');
  const handleTableName = (e,id) => {
    setTablename(e.target.value);
    console.table(e.target.value ,id)
  };

  const dispatchTableName = (e,id) => {
    if (!state.Port || isNaN(state.Port) || state.Port.toString().length !== 4) {
      alert("專案名與Port必填!Port 要是數字 四位數");
    }else{
      const buttonElement = e.target;
      buttonElement.disabled = true; // 将按钮变为不可点击
      
      const addbtn = document.getElementById(`btn-`+id)
      addbtn.disabled = true; // 将 input 变为不可点击

      const inputElement = document.getElementById(`tablename`+id);
      inputElement.disabled = true; // 将 input 变为不可点击
      
      console.log("??11",e.target.value ,id ,inputElement.name, inputElement.value)
      console.log("-22",tablename ,field_count)
      console.log("-33",state.ProjectName ,state.Port)
      dispatch({ type: 'P_TABLE_NAME',value:inputElement.value, name:inputElement.name});
    }
  };

  const handleAddField = () => {
    setFieldCount(field_count+1)
    setField((prevFields) => [...prevFields, <Field key={prevFields.length} tablenameCount={`tablename${props.count}`}  field_count={field_count} />]);
  };
//---------------------
  return (
    <>
        <table className="table">
          <thead >
            <tr>
              <td>
                Table名稱:
                <input
                  type="text"
                  name={`tablename${props.count}`}
                  value={tablename}
                  onChange={(e)=> handleTableName(e , `f${props.count}`) }
                  id={`tablename`+props.count}
                />
                <button 
                  onClick={(e)=> dispatchTableName (e , props.count) } 
                  className="btn btn-sm btn-info">確認</button>
              </td>
              <td>
                <button className="btn btn-sm btn-info" id={`btn-${props.count}`} onClick={handleAddField}>
                  新增欄位
                </button>
              </td>
            </tr>
          </thead>
        </table>
          <tr>
            <td>欄位</td>
            <td>顯示名稱</td>
            <td>資料庫型別/表單輸入類型</td>
            <td>必填</td>
          </tr>
          {field}
    </>
  );
}
