import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import {socket} from './socket.provider'
function App() {
  const [response, setResponse] = useState("");
  const [mousesCoord,setMousesCoord]=useState([]);
  //Component did mount
  useEffect(() => {
    console.log();
   
    socket.on("FromAPI", data => {
      setResponse(data);
    });
    //Component wil unmount 
    return () => { console.log("componentWillUnmount"); 
    socket.disconnect()}
  }, []);

  

  const emitMouseActivity=(e)=>{
    let mousePosition={
      x:e.pageX,
      y:e.pageY
    }
    
    socket.emit('mouse_activity',mousePosition);
    socket.on('all_mouse_activity', (data)=>{

      let index=mousesCoord.findIndex(function (item) {
        return item.session_id===data.session_id;
    })
      
      //console.log(index);
      let newMousesCoord =mousesCoord;
      if(index !=-1){
        newMousesCoord[index]=data;
        setMousesCoord(newMousesCoord);
      }
      else{
        setMousesCoord([...mousesCoord,data])
      }}
    )
  }
  return (
   
  
   <div  style={{backgroundColor:'salmon',height:'1000px'}} onMouseMove={emitMouseActivity}>
      <p >
    It's <time dateTime={response}>{response}</time>
  </p>
    { 
    mousesCoord.map((item,i)=>{
      return <div style={{position:'absolute',
      backgroundColor:'black',
      width:'4px',
      height:'4px',
      zIndex:'3',
      left:item.coords.x,
      top:item.coords.y
      }}>
        usuario: {item.session_id}
      </div>
      // return <div key={item.session_id}> aqui ta el mouse {i}  {item.session_id} 
      // coods x: {item.coords.x}  y: {item.coords.y}</div>
      
    })}
   
   </div>
  );
}

export default App;
