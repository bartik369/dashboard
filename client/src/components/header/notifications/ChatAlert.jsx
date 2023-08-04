import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { useGetUnreadMessagesQuery, useGetParticipantsQuery
 } from '../../../store/features/messenger/messengerApi'
 import './notifications.css'

export default function ChatAlert() {
    const user = useSelector(selectCurrentUser);
    const { data: participants} = useGetParticipantsQuery(user.id);
    const {data: unreadMessages} = useGetUnreadMessagesQuery(user.id)
    console.log(unreadMessages)
    console.log(participants && participants)
  return (
    <div className="messages-alert">
        {unreadMessages && unreadMessages.map((item) => {
            return (
                <div className="messages-alert__items">{participants && participants.map((sender) => {

                    if(sender.userId === item.senderId) {
                        return (
                            <div className="messages-alert__item">
                                <div className="avatar"><img src={sender.avatar} alt="" /></div>
                                <div className="sender-info">
                                    <div className="displayname">{sender.displayname}</div>
                                    <div className="message">{item.content}</div>
                                </div>
                            </div>
                        )
                    }
                })}</div>
            )
        })}
    </div>
  )
}
