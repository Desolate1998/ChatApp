import { Dialog } from '@material-ui/core'
import React from 'react'
interface IProps{
    isOpen:boolean;
}
export const SideMenu:React.FC<IProps> = ({isOpen}) => {
    return (
        <Dialog open={isOpen}>
            
        </Dialog>
    )
}
