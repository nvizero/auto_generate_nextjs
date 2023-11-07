import Head from 'next/head'
import { useState } from 'react';
import Table from './table'
import { useMyContext } from './context';

export default function Home() {
  const { state, dispatch } = useMyContext();
  const [tables, setTables] = useState([]);
  const [projectValue, setProjectValue] = useState(''); // 使用状态管理输入框的值
  const [count, setCount] = useState(1); // 使用状态管理输入框的值
  const [portValue, setPortValue] = useState(''); // 使用状态管理输入框的值
  //送出
  const handleButtonClick = () => {
    dispatch({ type: 'GETALL',num: state.count+1 });
  };

  const handleAddTable = () => {
    setCount(count + 1);
    dispatch({ type: 'INCREMENT',count:count});
    setTables((prevTables) => [...prevTables, <Table key={prevTables.length} count={count} />]); // 添加一个新的Table组件
  };

  const handlePortChange = (e) => {
    setPortValue(e.target.value);
    dispatch({ type: 'SET_PORT', port: e.target.value });
  };

  const handleProjectChange = (e) => {
    setProjectValue(e.target.value);
    dispatch({ type: 'SET_PORJECTNAME',projectname: e.target.value });
  };

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <h3><p>Count: {state.count}</p></h3>
        <table className='table'>
          <thead className="thead-dark">
            <tr>
              <td>                   
                  <button className="btn btn-primary addTable" onClick={handleAddTable}>新增Table</button>
              </td>
              <td>專案名 : <input type="text" name="project" className="project" value={projectValue} onChange={handleProjectChange} /></td>
              <td>port : <input type="text" name="port" className="port" value={portValue} onChange={handlePortChange}/></td>
              <td>                   
                  <button className="btn btn-primary" onClick={handleButtonClick}>送出</button>
              </td>
            </tr>
          </thead>
        </table>

        <br/>

        <>
          {tables}
        </>
        
    </div>
  )
}
