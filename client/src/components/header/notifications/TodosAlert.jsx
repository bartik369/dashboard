import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import "./notifications.css";

export default function TodosAlert({todos}) {

    return (
      <div className="todo-alert">
        <div className="todo-alert__items">
          {todos.map((todo, index) => {
            if (
              Date.parse(todo.endTime) <= Date.now() &&
              todo.status !== "done"
            ) {
              return (
                <div className="todo-alert__item" key={index}>
                  <div className="icon">
                  <i className="bi bi-exclamation-circle"></i>
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
        <button className="check-todos">
          <Link to="/todos">Посмотреть все</Link>
        </button>
      </div>
    );
}


