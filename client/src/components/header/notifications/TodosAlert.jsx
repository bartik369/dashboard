import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as contentConstants from "../../../utils/constants/content.constants"
import "./notifications.css";

export default function TodosAlert({todos, user}) {

    return (
      <div className="todo-alert">
        {/* <div className="todo-alert__title">{contentConstants.overdueTodosTitle}</div>
        <div className="todo-alert__items">
          {todos.map((todo, index) => {
            if (Date.parse(todo.endTime) <= Date.now() 
            && todo.status !== "done" && todo.user === user.id) {
              return (
                <div className="todo-alert__item" key={index}>
                  <div className="icon">
                    <i className="bi bi bi-check"></i>
                  </div>
                  <div className="description">
                    <div className="title">{todo.title}</div>
                    <div className="time">
                      {moment(todo.endTime).format("DD.MM.YYYY HH:mm")}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <button className="submit-btn-medium">
          <Link to="/todos">{contentConstants.openTodos}</Link>
        </button> */}
      </div>
    );
}


