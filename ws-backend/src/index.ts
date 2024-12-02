import WebSocket , {WebSocketServer} from "ws";


const wss  =  new WebSocketServer({port:8080});

interface User{
     socket:WebSocket,
     roomId:string
}

let allSocket : User[] = [];

wss.on("connection" , (socket)=>{
      
     console.log("user connected");
     // allSocket.push(socket);

     // socket.on("message" , (e)=>{
     //    const message = e.toString()
     //     for(let  i = 0 ; i<allSocket.length ; i++)
     //     {
     //            let soc =  allSocket[i];
     //            soc.send(e.toString());
     //     }


       
     // })


     socket.on("message" , (message)=>{
            const parseMessage  =  JSON.parse(message  as unknown as string )

            if(parseMessage.type == "join")
            {
                 allSocket.push({
                         socket,
                         roomId:parseMessage.payload.roomId
                 })
            }


            if(parseMessage.type == "chat")
            {
                  const cuurenUserRoom  =  allSocket.find((x)=>x.socket != socket);

                  for(let i = 0 ; i<allSocket.length ;i++)
                  {
                        if(allSocket[i].roomId == cuurenUserRoom?.roomId)
                        {
                               allSocket[i].socket.send(parseMessage.payload.message);
                               console.log(parseMessage.payload.message);
                        }
                  }
            }

     })


     socket.on("close" , ()=>{
           
          allSocket = allSocket.filter((x)=>x.socket!=socket)

     })
      

})