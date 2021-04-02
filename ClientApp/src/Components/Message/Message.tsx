import React from 'react'
import './MessageStyle.css'

interface IProps{
    Sender:boolean;
    Name:string;
    Message:string;
}

export const Message:React.FC<IProps> = ({Sender,Name,Message}) => {

    return (
        <div className={Sender?'sent':'Recived'}>
            <h3 className="MessageUserName">{Name}</h3>
            <pre className="MassagePre">{Message}</pre>
        </div>
    )
}
