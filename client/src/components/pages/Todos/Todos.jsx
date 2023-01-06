import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, getSingleTodo, loadTodos, updateTodo, addTodo } from "../../../store/actions/todosActions";
import AddTodoForm from "../../form/add-todo/AddTodoForm";
import moment from "moment";
import Modal from "../../UI/modal/Modal";
import UpdateTodoForm from "../../form/update-todo/UpdateTodoForm";
import { addModal, updateModal } from "../../../store/actions/modalActions";
import TodoButton from "../../UI/buttons/TodoButton";
import * as uiConstants from "../../../utils/constants/ui.constants";
import AddButton from "../../UI/buttons/AddButton";
import "../Todos/Todos.css";
import "../../../styles/App.css";
import Masonry from "react-masonry-css";

const Todos = () => {
  console.log("check memory");
  const [deleteId, setDeleteId] = useState();

  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const modal = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const createTodo = (newTodo) => {
    dispatch(addTodo(newTodo));
    dispatch(addModal(false));
  };

  const newTodoHandler = () => {
    dispatch(addModal(true));
  };

  const handleTodoDelete = (id) => {
    dispatch(deleteTodo(id));
    setDeleteId(id);
  };

  const handleTodoUpdate = (id) => {
    dispatch(updateModal(true));
    dispatch(getSingleTodo(id));
  };

  const updateTodoData = (updatedData) => {
    dispatch(updateTodo(updatedData, updatedData.id));
    dispatch(updateModal(false));
  };

  const handleTodoComplete = (id) => {
    const indexOfDoneItem = todos.find((item) => item._id === id);
    indexOfDoneItem.status = "done";
    dispatch(updateTodo(indexOfDoneItem, indexOfDoneItem._id));
  };

  const handleTodoReopen = (id) => {
    const indexOfReopenItem = todos.find((item) => item._id === id);
    indexOfReopenItem.status = "inprocess";
    dispatch(updateTodo(indexOfReopenItem, indexOfReopenItem._id));
  };
  const dateNow = Date.now();
  const breakpoints = {
    2560: 8,
    1920: 6,
    1800: 5,
    1600: 5,
    1400: 4,
    1201: 4,
    1100: 3,
    900: 2,
    700: 2,
    500: 1,
  };

  return (
    <div className="todos">
      <Modal active={modal.add}>
        <AddTodoForm create={createTodo} />
      </Modal>
      <Modal active={modal.update}>
        <UpdateTodoForm update={updateTodoData} />
      </Modal>
      <div className="add-todo">
        <AddButton className={"add-todo-btn"} icon={"bi bi-plus"} action={() => newTodoHandler()} title={uiConstants.newTask}/>
      </div>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {todos.map((todo, index) => {
          const startTodoDate = moment(todo.startTime).format(
            "DD.MM.YYYY HH:mm"
          );
          const endTodoDate = Date.parse(todo.endTime);

          return (
            <div
              className={`todo-item 
            ${endTodoDate <= dateNow && todo.status !== "done" ? "overdue" : ""}
            ${todo.status === "done" ? "done" : ""}
            ${deleteId === todo._id ? "delete-animation" : ""}`}
              key={index}
            >
              <div
                className={`icon-done ${
                  todo.status === "done" ? "completed" : ""
                }`}
              >
                <i className="bi bi-check-all"></i>
              </div>
              <div className="todo-item__title">{todo.title}</div>
              <div className="todo-item__description">{todo.description}</div>
              <hr className="separate" />
              <div className="time-info">
                <span className="time-text">{uiConstants.startTime}</span>
                <span className="start-time">{startTodoDate}</span>
                <span className="time-text">{uiConstants.endTime}</span>
                <span className="end-time">
                  {moment(endTodoDate).format("DD.MM.YYYY HH:mm")}
                </span>
              </div>
              <div className="todo-item__bottom">
                <div className="todo-btns">
                  <ul className="todo-btns__inner">
                    <li className="todo-btns__item">
                      <TodoButton
                        action={() => handleTodoComplete(todo._id)}
                        classNameBtn={"todoend-btn"}
                        classNameIcon={"bi bi-check2-square"}
                        title={uiConstants.titleСomplete}
                      />
                    </li>
                    <li className="todo-btns__item">
                    <TodoButton
                        action={() => handleTodoUpdate(todo._id)}
                        classNameBtn={"todoupdate-btn"}
                        classNameIcon={"bi bi-arrow-clockwise"}
                        title={uiConstants.titleUpdate}
                      />
                    </li>
                    <li className="todo-btns__item">
                      <TodoButton
                        action={() => handleTodoDelete(todo._id)}
                        classNameBtn={"tododel-btn"}
                        classNameIcon={"bi bi-trash3"}
                        title={uiConstants.titleDelete}
                      />
                    </li>
                    <li className="todo-btns__item">
                    <TodoButton
                        action={() => handleTodoReopen(todo._id)}
                        classNameBtn={"todoreopen-btn"}
                        classNameIcon={"bi bi-arrow-counterclockwise"}
                        title={uiConstants.titleReopen}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </Masonry>
    </div>
  );
};

export default Todos;
