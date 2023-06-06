import React from "react";
import { useGetUsersQuery } from "../../../store/features/auth/authApi";
import "./messenger.css";

function Contacts({recipientEmail}) {
  const { data: contacts } = useGetUsersQuery();

  const contactHandler = (email) => {
    recipientEmail(email)
  };
 
  return (
    <div>
      <h1>Contacts</h1>
      <ul className="contacts__items">
        {contacts &&
          contacts.map((item, index) => {
            return (
              <li
                className="contacts__item"
                key={index}
                onClick={() => contactHandler(item.email)}>
                <span className="contact__name">{item.displayname}</span>
                <span className="contact__email">{item.email}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Contacts;
