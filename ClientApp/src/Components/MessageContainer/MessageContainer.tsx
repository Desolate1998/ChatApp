import React from 'react'
import { SessionHelper, SessionVariabels } from '../../infrastructure/HelperScripts/SessionHelper'
import { IMessage } from '../../infrastructure/Models/Message'
import { Message } from '../Message/Message'
interface IProps {
  Messanges: IMessage[]
}
export const MessageContainer: React.FC<IProps> = ({ Messanges }) => {

  

  return (
    <div>
      {Messanges.map((item, index) => {
        return (
          <Message
            key={index}
            Message={item.message}
            Sender={
              item.senderId ===
              parseInt(SessionHelper.GetVerable(SessionVariabels.Id)!)
            }
          />
        )
      })}
    </div>
  )
}
