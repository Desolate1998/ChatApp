import * as signalR from "@microsoft/signalr";
import * as data from '../../Config.json'
 class  HubHelper {
    Connection:signalR.HubConnection;
    constructor() {
       this.Connection = new signalR.HubConnectionBuilder().withUrl(data.HubUrl).build();
    
        
    } 
}
export {HubHelper}