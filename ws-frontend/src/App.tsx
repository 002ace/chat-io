
import { useEffect, useRef, useState } from 'react'


function App() {
  

  const [mess  , setMessage]  =  useState(["hii there"])
  const[ws ,  setWs] =  useState<WebSocket>()

  const mesRef =  useRef<HTMLInputElement>(null)
  const joinRef =  useRef<HTMLInputElement>(null)



  useEffect(()=>{

    const wss  =  new WebSocket("ws://localhost:8080")

    setWs(wss)

    wss.onopen = () => {
      console.log('WebSocket connection opened');
    };

    wss.onmessage = (event)=>{
          console.log(event.data)
         

          setMessage((prev) => [...prev , event.data])
    }

       

  } , [])

  const sendMess = ()=>{
    console.log("send message work")
     ws?.send(JSON.stringify({
           type:"chat",
           payload:{
              message : mesRef.current?.value
           }
     }))
  }

  const   joinRoom = ()=>{
      
    
             ws?.send(JSON.stringify({
                     type:"join",
                     payload:{
                        roomID : joinRef.current?.value
                     }
             }))
      
      
       

  }

  

 
  
 

  return (
    <div  className='bg-black h-screen  w-screen mx-auto  flex flex-col justify-center items-center '>
           

           <div  >
               
               
               <input   ref={joinRef}  placeholder='join'  type='text'  className='bg-white text-black'/>
               <button   className=' text-white' onClick={joinRoom}  >join</button>


           </div>
           <div className='h-60 w-96 bg-sky-500  text-red'>

            {
              mess.map((message) => <div>{message}</div>)
            }
          
           </div>  

           <div >
             <input   ref={mesRef} placeholder='message'  type='text'   />
             <button  className='text-white'  onClick={sendMess}  >Send</button>

             
           </div>
          
    </div>
  )
}
export default  App