import React, { useEffect, useState } from "react";

export default function Chat(props) {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState([]);
  const [ws, setWS] = useState(null);

  useEffect(() => {
    const newWS = new WebSocket('ws://localhost:8080/socket'); // WebSocket server address

    newWS.onopen = () => {
      setIsConnected(true);
      setWS(newWS);
    };

    newWS.onerror = (err) => console.error(err);
    newWS.onmessage = (msg) => {
      const receivedData = JSON.parse(msg.data);
      setData(prevData => [...prevData, receivedData]);
    };
    newWS.onclose = () => {
      setIsConnected(false);
      setWS(null);
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []); // Empty dependency array to run the effect only once on component mount

  // 分割消息并创建列表项
  const createListItems = (message) => {
    const parts = message.split('\n').map((part, index) => {
      return (
        <li key={index} dangerouslySetInnerHTML={{ __html: convertAnsiToHtml(part) }}></li>
      );
    });
    return <ul>{parts}</ul>;
  };

  function convertAnsiToHtml(text) {
      // Define a mapping from ANSI color codes to CSS colors
      const colorMap = {
          '31': 'red',    // Red
          '32': 'green',  // Green
          '33': 'orange'  // Orange (closest to ANSI yellow)
          // Add more mappings as needed
      };

      // Regular expression to match ANSI escape codes
      const regex = /\u001b\[(\d+)m(.*?)\u001b\[39m/g;

      return text.replace(regex, (match, p1, p2) => {
          const color = colorMap[p1];
          return color ? `<span style="color: ${color}">${p2}</span>` : p2;
      });
  }


  return (
    <div>
      {isConnected ? "Connected" : "Not Connected"}
      <div>
        {data.map((item, index) => (
          <div key={index}>{createListItems(item.reply)}</div>
        ))}
      </div>
    </div>
  );
}
