import React, { useState } from 'react'
import './css/style.css'
import {io} from 'socket.io-client'
import ChatBox from './components/ChatBox'

let socket=io("https://onlinechatappbackend.onrender.com")

const App = () => {
  const [text,setText]=useState('')
  const [text2,setText2]=useState('')
  const [toggle,setToggle]=useState(true)

  const obj={
    name:text2,
    groupName:text
  }



    const joingroup=()=>{
    if(text!=="" && text2 !==""){
      socket.emit("JoinRoom",obj)
      setToggle(false)
    }
      
    }
  
// const sendgroupmessage=()=>{
//     socket.emit("sendmessage",text)
//     }
  return (
    <div className='entergroup'>
    {toggle?
     <>
      <label htmlFor='group'>Gropu name</label>
      <input type='text' id='group'  onChange={(e)=>setText(e.target.value)}/>
      <label htmlFor='name'>User Name</label>
      <input type='text2' id='name' onChange={(e)=>setText2(e.target.value)}/>
      <button onClick={joingroup}>join group</button>
      <p>Instruction* enter your name and enter the gropu-name other particepent that joins group should enter the same group-name in order to chat width with other</p>
      </>:
      <ChatBox socket={socket} obj={obj}/>
    }
    </div>
  )
}

export default App

