import React from 'react'

const Home = () => {
  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img src="/codeTogether-logo.png" alt="code-sync logo" />
        <h4 className='mainLabel'>
          Paste Invitation Room Id
        </h4>
        <div className='inputGroup'>
          <input type="text" className='inputBox' placeholder='Enter Room Id' />
          <input type="text" className='inputBox' placeholder='Enter UserName' />
          <button>
            Join Room
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home