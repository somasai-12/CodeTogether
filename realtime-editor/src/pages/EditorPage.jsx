import React, { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import { useLocation } from "react-router-dom";

const EditorPage = () => {

  const socketRef = useRef(null);
  const location = useLocation();

  useEffect(()=>{
    const init = async ()=>{
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error',(err)=>handleErrors(err));
      socketRef.current.on('connect_failed',(err)=>handleErrors(err));

      socketRef.current.emit(ACTIONS.JOIN,{
        roomId,
        userName: location.state?.userName
      });
    };
    init();
  },[]);

  const [clients, setClients] = useState([
    { socketId: 1, userName: "Rakesh K" },
    { socketId: 2, userName: "Prakash G" },
  ]);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img
              className="logoImage"
              src="/codeTogether-logo.png"
              alt="logo"
            />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} userName={client.userName} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy RoomID</button>
        <button className="btn leaveBtn">Leave Room</button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
