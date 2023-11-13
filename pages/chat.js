import React, { useEffect, useState } from "react";

export default function Chat(props) {

  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState(props.data);
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
      setData(receivedData);
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

  return (
    <div>
      {isConnected ? "Connected" : "Not Connected"}
      <div>reply : { data ? data.reply : "" }</div>
    </div>
  );
}

