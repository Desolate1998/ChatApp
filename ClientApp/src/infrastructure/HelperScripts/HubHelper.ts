import { HubConnectionBuilder } from "@microsoft/signalr";
import * as data from '../../Config.json'

const connection = new HubConnectionBuilder()
    .withUrl(data.HubUrl)
    .build();

async function start() {
    try {
        await connection.start();

        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

connection.onclose(start);

function GetNewMessage(callBack:Function){
   connection.on('NewMessage',(m)=>{
      callBack(m)
   })
}

start();
export{connection,GetNewMessage}