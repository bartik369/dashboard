import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import "../forms.css";
import SubmitButton from "../../UI/buttons/SubmitButton";
import * as formConstants from "../../../utils/constants/form.constants";
import * as REGEX from "../../../utils/constants/regex.constants";


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
    control,
    reset,
    formState: { errors },
    handleSubmit, 
    watch,
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const dispatch = useDispatch();


  const onSubmit = (data) => {
    const newTodo = {
      ...todo,
      title: data.title,
      description: data.description,
      status: "inprocess",
      startTime: data.starttime,
      endTime: data.endtime,
    }
    create(newTodo)
  };

  return (
    <form  className="add-todo-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
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
        {errors.title && <p>{errors.title.message || "Error"}</p>}
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
       <div className="form-error">
        {errors.starttime && <p>{errors.starttime.message || "Error"}</p>}
      </div>
      <Controller
      control={control}
      name="starttime"
      {...register("starttime", {
        required: "start time is requied",
        minLength: {
          value: 3,
          message: formConstants.minLengthOfDisplayName,
        },
      })}
      render={({ field: {onChange, value}}) => (
        <DatePicker
        value={Date.parse(todo.startTime)}
        selected={value}
        onChange={onChange}
        selectsStart
        startDate={Date.parse(todo.startTime)}
        endDate={Date.parse(todo.endTime)}
        className="date-input"
        placeholderText="Дата начала"
        showTimeSelect
        timeFormat="p"
        timeIntervals={15}
        dateFormat="Pp"
        timeCaption="time"
        locale={ru}
        />
      )}
      />

      <Controller
        control={control}
        name="endtime"
        render={({ field: { onChange, value} }) => (
        <DatePicker
          value={Date.parse(todo.endTime)}
          selected={value}
          onChange={onChange}
          selectsEnd
          startDate={Date.parse(todo.startTime)}
          endDate={Date.parse(todo.endTime)}
          minDate={Date.parse(todo.startTime)}
          className="date-input"
          placeholderText="Дата завершения"
          showTimeSelect
          timeFormat="p"
          timeIntervals={15}
          dateFormat="Pp"
          timeCaption="time"
          locale={ru}
        />
        )}
      />
    
      


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
