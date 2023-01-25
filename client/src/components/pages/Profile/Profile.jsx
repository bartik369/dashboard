import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from '../../UI/modal/Modal';
import ChangePassword from '../../form/change-password/ChangePassword';

export default function Profile() {

    const [activeModal, setActiveModal] = useState(null);
    const user = useSelector(state => state.user.user)

    console.log(user)

    const changePassword = () => {
        setActiveModal(true);
    }

    const closeModal = () => {
        setActiveModal(null);
      }
    


  return (
    <div className="profile">
        <Modal active={activeModal} close={closeModal}>
            <ChangePassword email={user.email} />
        </Modal>
        <div className="user-info">
        <h1>User Info</h1>
        <div className="name">{user.displayname}</div>
        <div className="email">{user.email}</div>
        <div className="change-password">
        <Link to="#" onClick={changePassword}>Изменить пароль</Link>
        </div>
        </div>
    </div>
  )
}
