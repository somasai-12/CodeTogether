import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setuserName] = useState("");
  const navigate = useNavigate();

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    //console.log(id);
    toast.success('Created a new room');
  };

  const joinRoom = ()=>{
    if(!roomId||!userName){
      toast.error('Room Id & userName is required');
      return;
    }
    //Redirect
    navigate(`/editor/${roomId}`, {
      state:{
        userName,
      },
    });
  };

  const handleInputEnter = (e) => {
    // console.log('event', e.code);
    if(e.code === 'Enter'){
      joinRoom();
    }
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          src="/codeTogether-logo.png"
          className="codeTogether-logo"
          alt="code-sync logo"
        />
        <h4 className="mainLabel">Paste Invitation Room ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Enter Room Id"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="Enter UserName"
            onChange={(e) => setuserName(e.target.value)}
            value={userName}
            onKeyUp={handleInputEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>Join Room</button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;{" "}
            <a onClick={createNewRoom} href="" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built by <a href="https://github.com/somasai-12">Somasai</a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
