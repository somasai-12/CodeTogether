import React, { useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";

const EditorPage = () => {
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
