import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import SubmitButton from "../../UI/buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import * as formConstants from "../../../utils/constants/form.constants";
import "react-datepicker/dist/react-datepicker.css";
import "../forms.css";

const AddTodoForm = ({ create }) => {
  const [todo, setTodo] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
    startTime: "",
    endTime: "",
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const newTodo = {
      ...todo,
      title: data.title,
      description: data.description,
      status: "inprocess",
      startTime: todo.startTime,
      endTime: todo.endTime,
    };
    create(newTodo);
    reset();
  };

  const handleAddStartTime = (date) => {
    setTodo({...todo, startTime: date})
  };

  const handleAddEndTime = (date) => {
    setTodo({...todo, endTime: date})
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-error">
        {errors.title && <p>{errors.title.message || "Error"}</p>}
      </div>
        <input
          className="todo-form__input"
          placeholder={formConstants.todoTitlePlaceholder}
          type="text"
          name="title"
          {...register("title", {
            required: formConstants.requiredTodoTitle,
            minLength: {
              value: 7,
              message: formConstants.minTodoTitle,
            },
          })}
        />
      <div className="form-error">
        {errors.description && <p>{errors.description.message || "Error"}</p>}
      </div>
      <textarea
        className="todo-form__input"
        placeholder={formConstants.todoDescriptionPlaceholder}
        type="text"
        name="description"
        {...register("description", {
          required: formConstants.requiredTodoDescription,
          minLength: {
            value: 10,
            message: formConstants.minTodoDescription,
          },
        })}
      />
      <div className="todo-form__date">
        <div className="start">
          {/* <i className="bi bi-calendar3"></i> */}
          <FontAwesomeIcon icon={faCalendar} className="todo-calendar-icon" />
          <FontAwesomeIcon icon="fa-light fa-calendar" />
          <div className="date">
            <DatePicker
              name="starttime"
              required={true}
              value={Date.parse(todo.startTime)}
              selected={todo.startTime}
              onChange={(date) => handleAddStartTime(date)}
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
          </div>
        </div>
        <div className="end">
          <i className="bi bi-clock-history"></i>
          <div className="date">
            <DatePicker
              name="endtime"
              required={true}
              value={todo.endTime}
              selected={todo.endTime}
              onChange={(date) => handleAddEndTime(date)}
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
          </div>
        </div>
      </div>
      <div className="todo-action-btn">
      <SubmitButton className={"submit-btn-medium"} title={formConstants.send} />
      </div>
    </form>
  );
};

export default AddTodoForm;
