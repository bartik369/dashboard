import React, { useState} from "react";
import { useSelector } from "react-redux";
import AddTodoForm from "../../form/add-todo/AddTodoForm";
import moment from "moment";
import Modal from "../../UI/modal/Modal";
import UpdateTodoForm from "../../form/update-todo/UpdateTodoForm";
import TodoButton from "../../UI/buttons/TodoButton";
import { breakpoints } from "../../../utils/data-arrays/arrays";
import * as uiConstants from "../../../utils/constants/ui.constants";
import * as contentConstants from "../../../utils/constants/content.constants";
import { 
  useGetTodosQuery, 
  useGetTodoMutation, 
  useUpdateTodoMutation, 
  useDeleteTodoMutation,
  useAddTodoMutation,
 } from "../../../store/features/todos/todoApi";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import AddButton from "../../UI/buttons/AddButton";
import "../Todos/Todos.css";
import "../../../styles/App.css";
import Masonry from "react-masonry-css";

const Todos = () => {
  const [deleteId, setDeleteId] = useState();
  const [activeModal, setActiveModal] = useState(null);
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const [addTodo] = useAddTodoMutation()
  const {data: todos} = useGetTodosQuery();
  const [getTodo, {data: todo }] = useGetTodoMutation();
  const user = useSelector(selectCurrentUser);
  const dateNow = Date.now();

  const newTodoHandler = () => {
    setActiveModal(contentConstants.create);
  }

  const createTodo = async (newTodo) => {
    await addTodo(newTodo).unwrap()
    setActiveModal(null);
  }

  const handleTodoDelete = (id) => {
    setDeleteId(id)
    deleteTodo(id)
  }

  // Update todo

  const handleTodoUpdate =  async(id) => {
    setActiveModal(contentConstants.update);
    await getTodo({id: id})
  }

  const updateTodoData = async (updatedData) => {
    await updateTodo(updatedData).unwrap()
    setActiveModal(null);
  }

  const handleTodoComplete = async(id) => {
    const completedTodo = todos.find((item) => item._id === id);
    const setTodoStatus = {...completedTodo}
    setTodoStatus.status = contentConstants.doneStatus
    await updateTodo(setTodoStatus).unwrap()
  }

  const handleTodoReopen = async(id) => {
    const reopenTodo = todos.find((item) => item._id === id);
    const setTodoStatus = {...reopenTodo}
    setTodoStatus.status = contentConstants.inProcessStatus;
    await updateTodo(setTodoStatus).unwrap()
  }

  const closeModal = () => {
    setActiveModal(null);
  }

  return (
    <div className="todos">
      {activeModal && 
        <Modal active={activeModal} close={closeModal}>
          {activeModal === contentConstants.create ? 
            <AddTodoForm create={createTodo} /> : null
          } 
          {(activeModal === contentConstants.update && todo) ? 
           <UpdateTodoForm  todo={todo} update={updateTodoData} /> : null
          }
        </Modal>
      }
      <div className="add-todo">
        <AddButton
          className={"add-todo-btn"}
          icon={"bi bi-plus"}
          action={() => newTodoHandler()}
          title={uiConstants.newTask}
        />
      </div>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {todos && todos.map((todo, index) => {

          if ((todo.user === user.id)) {
          const startTodoDate = moment(todo.startTime).format("DD.MM.YYYY HH:mm");
          const endTodoDate = Date.parse(todo.endTime);
          const checkStatus = endTodoDate <= dateNow && todo.status !== contentConstants.doneStatus;

          return (
            <div className={`todo-item
            ${endTodoDate <= dateNow && todo.status !== contentConstants.doneStatus ? contentConstants.overdue : ""}
            ${todo.status === contentConstants.doneStatus ? contentConstants.doneStatus : ""}
            ${deleteId === todo._id ? "delete-animation" : ""}`}
              key={index}
            >
              <div className={`todo-item__back ${checkStatus ? contentConstants.overdue : ""}`}></div>
              <div className={"todo-item__inner"}>
                <div className={`icon-done ${todo.status === contentConstants.doneStatus ? contentConstants.completed : ""}`}>
                  <i className="bi bi-check-all"></i>
                </div>
                <div className="todo-item__title">{todo.title}</div>
                <div className="todo-item__description">{todo.description}</div>
                <div className="separate"></div>
                <div className="time-info">
                  <span className="time-text">{uiConstants.startTime}</span>
                  <span className="start-time">{startTodoDate}</span>
                  <span className="time-text">{uiConstants.endTime}</span>
                  <span className="end-time">
                    {moment(endTodoDate).format("DD.MM.YYYY HH:mm")}
                  </span>
                </div>
            </div>
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
          );
          }
        })}
      </Masonry>
    </div>
  );
};

export default Todos;
