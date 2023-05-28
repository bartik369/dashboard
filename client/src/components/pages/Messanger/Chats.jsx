import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { useGetChatsQuery } from '../../../store/features/messenger/messengerApi';

export default function Chats() {
  const user = useSelector(selectCurrentUser)
  const {data: chats, isLoading} = useGetChatsQuery(user.email)

  useEffect(() => {
    console.log(chats)
  }, [chats])
  
  return (
    <div>
        <ul>
          {chats && chats.map((item) => {
           
          })}
        </ul>
    </div>
  )
}
