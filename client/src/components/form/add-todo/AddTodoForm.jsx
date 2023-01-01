import React, { useState, useEffect } from "react";
import FormInput from "../FormInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';


const AddTodoForm = ({ create }) => {
  const [todo, setTodo] = useState(
    {
      id: "",
      title: "",
      description: "",
      status: "",
      startTime: "",
      endTime: "",
    }
  );

  const [errors, setErrors] = useState(
    {
      title: "",
      starttime: "",
      endtime: "",
    }
  );
  const [validForm, setValidForm] = useState(false);

  useEffect(() => {
    if (todo.title !== "" 
    && todo.description !== "" 
    && todo.startTime !== "" 
    && todo.endTime !== "") {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [todo.title, todo.description, todo.startTime, todo.endTime]);

  const validate = (name, value) => {
    const checkRegExp = new RegExp(/^[a-zа-яё]+$|\s/i).test(value);
    switch (name) {
      case "title":
        !checkRegExp
          ? setErrors({...errors, title: "Укажите корректный заголовок"})
          : setErrors({...errors, title: ""})
        break;
      case "description":
        !checkRegExp
          ? setErrors({...errors, description: "Укажите корректное описание"})
          : setErrors({...errors, description: ""})
        break;
      default:
        break;
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    validate(name, value)
    setTodo({...todo, [name]: value})
  }

  const handleStartTime = (date) => {
    setTodo({...todo, startTime: date})
  }

  const handleEndTime = (date) => {
    setTodo({...todo, endTime: date})
  }

  const addTodoHandler = () => {
     const newTodo = {
      title: todo.title,
      description: todo.description,
      status: "inprocess",
      startTime: todo.startTime,
      endTime: todo.endTime,
    };
    create(newTodo);
    setTodo({
      id: "",
      title: "",
      description: "",
      status: "",
      startTime: "",
      endTime: "",
    })
  };

  return (
    <div className="add-todo-form">
      {errors.title && <div className="form-error">{errors.title}</div>}
      <FormInput
        placeholder="Название задачи"
        value={todo.title}
        name="title"
        onChange={(e) => handleChange(e)}
      />
      {errors.description && <div className="form-error">{errors.description}</div>}
      <textarea
        value={todo.description}
        name="description"
        onChange={(e) => handleChange(e)}
        cols="20"
        rows="10"
      />
      <DatePicker
        name="starttime"
        value={todo.startTime}
        selected={todo.startTime}
        onChange={(date) => handleStartTime(date)}
        selectsStart
        startDate={todo.startTime}
        endDate={todo.endTime}
        className="date-input"
        placeholderText="Дата начала"
        showTimeSelect
        timeFormat="p"
        timeIntervals={15}
        dateFormat="Pp"
        timeCaption="time"
        locale={ru}
      />
      <DatePicker
        name="endtime"
        value={todo.endTime}
        selected={todo.endTime}
        onChange={(date) => handleEndTime(date)}
        selectsEnd
        startDate={todo.startTime}
        endDate={todo.endTime}
        minDate={todo.startTime}
        className="date-input"
        placeholderText="Дата завершения"
        showTimeSelect
        timeFormat="p"
        timeIntervals={15}
        dateFormat="Pp"
        timeCaption="time"
        locale={ru}
      />
      
      <button disabled={!validForm} type='submit' className="add-btn" onClick={() => addTodoHandler()}>
        Добавить
      </button>
    </div>
  );
};

export default AddTodoForm;
