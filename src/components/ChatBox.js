import React, { useEffect, useState } from 'react'

const ChatBox = ({socket, obj}) => {

const [text,setText]=useState('')
const [store,setStore]=useState([])
const [value,setvalue]=useState('')



const handelSend=()=>{
     socket.emit("SendMessage",text) 
  setText('')
    
}
const handelChange=(e)=>{
    setText(e.target.value)
}

console.log(value);
useEffect(()=>{
    socket.on("Joined",(data)=>{
       setvalue(data)
      })
    socket.on("sendMessagetoRoom",(data)=>{
          setStore((previousData)=>[...previousData,data])
          
           })
},[socket]) 
console.log(store);
  return (
    <div className='group'>
      <div className='nav'>{obj.groupName}</div>
      <div className='chats'>
       {
         store.map((item,index)=>{
          return(
              <div key={index} className={(obj.name===item.sendBy)?"sender":"reciver"}>
                <p className='sendby'>{item.sendBy}</p>
                <p className='sendbymsg'>{item.message}</p>
              </div>
          )
         }) 
       }
      
      </div>
      <div className='type-chat'>
       <input type='text' value={text} onChange={handelChange} placeholder=' TYPE MESSAGE' className='msg'/>
       <button className='btn-msg' onClick={handelSend}>SEND MESSAGE</button>
      </div>
    </div>
  )
}

export default ChatBox
