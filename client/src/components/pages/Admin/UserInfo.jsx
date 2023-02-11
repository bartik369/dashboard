import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

export default function UserInfo() {

  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo.userInfo);

  const [userCommonInfo, setUserCommonInfo] = useState({
    displayname: "",
    email: "",
    roles: "",
  });

  const [userAdditionalInfo, setUserAdditionalInfo] = useState({
    description: "",
    city: "",
    birthday: "",
    phone: "",
    work: {
      departament: "",
      phone: "",
      vocation: "",
    },
    avatar: "",
  });


  return (
    <div>
      <h1>User info</h1>
      <input type="text" placeholder='Search user' />
      <div className="result"></div>
    </div>
  )
}
