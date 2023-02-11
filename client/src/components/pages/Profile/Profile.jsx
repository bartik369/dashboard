import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {useForm} from "react-hook-form";
import Modal from '../../UI/modal/Modal';
import ChangePassword from '../../form/change-password/ChangePassword';

export default function Profile() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.auth.user);
    const userInfo = useSelector(state => state.userInfo.userInfo);
    const [activeModal, setActiveModal] = useState(null);
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

      const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
      } = useForm({
        mode:"onBlur"
      })

    const changePassword = () => {
        setActiveModal(true);
    }

    const closeModal = () => {
        setActiveModal(null);
      }
    


  return (
    <div className="profile">
        {/* <Modal active={activeModal} close={closeModal}>
            <ChangePassword email={user.email} />
        </Modal>
        <div className="user-info">
        <h1>User Info</h1>
        <div className="name">{user.displayname}</div>
        <div className="email">{user.email}</div>
        <div className="description">{userInfo.description}</div>
        <div className="city">{userInfo.city}</div>
        <div className="birthday">{userInfo.birthday}</div>
        <div className="phone">{userInfo.phone}</div>
        <div className="departament">{userInfo.work.departament}</div>
        <div className="phone">{userInfo.work.phone}</div>
        <div className="vocation">{userInfo.work.vocation}</div>


        <div className="change-password">
        <Link to="#" onClick={changePassword}>Изменить пароль</Link>
        </div>
        </div> */}
        <form action="">

        </form>
    </div>
  )
}
