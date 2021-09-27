import ChatStore from './Chats'
import {createContext,useContext} from 'react'
import HubConnectionStore from './HubConnectionStore';

//INterface to show which stores are avaliabe
interface Store {
  chatStore: ChatStore;

}
//create our "store hub"
export const store: Store = {
  chatStore : new ChatStore(),

}

//export our stores
export const StoreContext = createContext(store);
export function useStore(){
    return useContext(StoreContext)
}
