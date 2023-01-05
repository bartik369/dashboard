import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import SubmitButton from "../../UI/buttons/SubmitButton";
import * as formConstants from "../../../utils/constants/form.constants";
import * as REGEX from "../../../utils/constants/regex.constants";
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

  const [startTimeTodo, setStartTimeTodo] = useState("");
  const [endTimeTodo, setEndTimeTodo] = useState("");

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
      startTime: startTimeTodo,
      endTime: endTimeTodo,
    };
    create(newTodo);
    reset();
  };

  const handleAddStartTime = (date) => {
    setStartTimeTodo(date);
  };

  const handleAddEndTime = (date) => {
    setEndTimeTodo(date);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-error">
        {errors.title && <p>{errors.title.message || "Error"}</p>}
      </div>
      <div className="someforicin">
        <input
          placeholder="name of task"
          type="text"
          name="title"
          {...register("title", {
            required: formConstants.fillName,
            pattern: {
              value: REGEX.isValidDisplayName,
              message: formConstants.wrongNameFormat,
            },
            minLength: {
              value: 3,
              message: formConstants.minLengthOfDisplayName,
            },
          })}
        />
      </div>
      <div className="form-error">
        {errors.description && <p>{errors.description.message || "Error"}</p>}
      </div>
      <textarea
        placeholder="todo description"
        type="text"
        name="description"
        {...register("description", {
          required: "required ares",
          minLength: {
            value: 3,
            message: formConstants.minLengthOfDisplayName,
          },
        })}
      />
      <div className="todo-form__date">
        <div className="start">
          <i className="bi bi-clock"></i>
          <div className="date">
            <DatePicker
              name="starttime"
              required={true}
              value={Date.parse(startTimeTodo)}
              selected={startTimeTodo}
              onChange={(date) => handleAddStartTime(date)}
              selectsStart
              startDate={startTimeTodo}
              endDate={endTimeTodo}
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
          <i className="bi bi-clock"></i>
          <div className="date">
            <DatePicker
              name="endtime"
              required={true}
              value={endTimeTodo}
              selected={endTimeTodo}
              onChange={(date) => handleAddEndTime(date)}
              selectsEnd
              startDate={startTimeTodo}
              endDate={endTimeTodo}
              minDate={startTimeTodo}
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
      {/* {errors.title && <div className="form-error">{errors.title}</div>}
      <input
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
      <SubmitButton disabled={!validForm} className={"submit-btn"} title={formConstants.send}/> */}
      <SubmitButton className={"submit-btn"} title={formConstants.send} />
    </form>
  );
};

export default AddTodoForm;
