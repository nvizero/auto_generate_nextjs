import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import Table from './table'
import Chat from './chat'
import { useMyContext } from './context';

export default function Home() {
  useEffect(() => {

    // projectValue('projectname')

  });

  const { state, dispatch } = useMyContext();
  const [tables, setTables] = useState([]);
  const [projectValue, setProjectValue] = useState('projectname'); // 使用状态管理输入框的值
  const [count, setCount] = useState(1); // 使用状态管理输入框的值
  const [portValue, setPortValue] = useState('1001'); // 使用状态管理输入框的值
  
  //送出
  const handleButtonClick = () => {
    dispatch({ type: 'POST_ALL'});
  };

  const handleAddTable = () => {
    setCount(count + 1);
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
         
        <table className='table'>
          <thead className="thead-dark">
            <tr>
              <td>                   
                  <button className="btn btn-sm btn-primary" onClick={handleButtonClick}>送出</button>
              </td>
              <td>專案名 : <input type="text" name="project" className="project" value={projectValue} onChange={handleProjectChange} /></td>
              <td>port : <input type="text" name="port" className="port" value={portValue} onChange={handlePortChange}/></td>
              <td>                   
                  <button className="btn btn-sm btn-primary addTable" onClick={handleAddTable}>新增Table</button>
              </td>
            </tr>
          </thead>
        </table>

        <br/>         
        <>
          {tables}
        </>
        <Chat />
    </div>
  )
}
