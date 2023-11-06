import React, { useState } from 'react';
import Field from './field';
import { useMyContext } from './context';

export default function Table(props) {
  const { state, dispatch } = useMyContext();
  const [f, setF] = useState(1); // 使用状态管理输入框的值
  const [field, setField] = useState([]);
  const [tablename, setTablename] = useState('');

  const handleTableName = (e,id) => {
    setTablename(e.target.value);
    console.table(e.target.value ,id)
  };

  const dispatchTableName = (e,id) => {
    const buttonElement = e.target;
    buttonElement.disabled = true; // 将按钮变为不可点击

    const inputElement = document.getElementById(`tablename`+id);
    inputElement.disabled = true; // 将 input 变为不可点击
    
    console.log("??",e.target.value ,id ,inputElement.value)
    dispatch({ type: 'DECREMENT' ,num:state.count-1});
  };

  const handleAddField = () => {
    setF(f+1)
    setField((prevFields) => [...prevFields, <Field key={prevFields.length} field_count={f} />]);
  };
//---------------------
  return (
    <>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <td>
                Table名稱:
                <input
                  type="text"
                  name="tablename"
                  value={tablename}
                  onChange={(e)=> handleTableName(e , `f${props.count}`) }
                  id={`tablename`+props.count}
                />
                <button 
                  onClick={(e)=> dispatchTableName (e , props.count) } 
                  className="btn btn-sm btn-info">確認</button>
              </td>
              <td>
                <button className="btn btn-sm btn-info" onClick={handleAddField}>
                  新增欄位
                </button>
              </td>
            </tr>
          </thead>
        </table>

          {field}
    </>
  );
}
