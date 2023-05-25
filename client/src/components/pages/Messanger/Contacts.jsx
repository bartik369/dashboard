import React from "react";
import { useGetUsersQuery } from "../../../store/features/auth/authApi";
import "./messenger.css";

function Contacts() {
  const { data: contacts } = useGetUsersQuery();

  const contactHandler = (id) => {
    console.log(id)
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
                onClick={() => contactHandler(item._id)}>
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
