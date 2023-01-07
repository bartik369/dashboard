import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTodos } from "../../../store/actions/todosActions";
import { useForm } from "react-hook-form";
import SubmitButton from "../../UI/buttons/SubmitButton";
import * as formConstants from "../../../utils/constants/form.constants";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import "../../form/forms.css";
import "react-datepicker/dist/react-datepicker.css";

const UpdateTodoForm = ({ update }) => {
  const [updatedTodo, setUpdatedTodo] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
    startTime: "",
    endTime: "",
  });

  let dispatch = useDispatch();
  const { todo } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(loadTodos());
    setUpdatedTodo({ ...todo });
  }, [todo]);


  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const updateTodoData = {
      ...updatedTodo,
      id: updatedTodo._id,
      title: data.title,
      description: data.description,
      status: updatedTodo.status,
      startTime: updatedTodo.startTime,
      endTime: updatedTodo.endTime,
    };
    update(updateTodoData);
    reset()
  };

  const handleStartTime = (date) => {
    setUpdatedTodo({ ...updatedTodo, startTime: date });
  };

  const handleEndTime = (date) => {
    setUpdatedTodo({ ...updatedTodo, endTime: date });
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="todo-form__title">{formConstants.updateTodoTitle}</div>
      <div className="form-error">
        {errors.title && <p>{errors.title.message || "Error"}</p>}
      </div>
        <input
          className="todo-form__input"
          placeholder={formConstants.todoTitlePlaceholder}
          type="text"
          name="title"
          defaultValue={updatedTodo.title || ""}
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
        defaultValue={updatedTodo.description || ""}
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
          <i className="bi bi-calendar3"></i>
          <div className="date">
            <DatePicker
              name="starttime"
              required={true}
              value={Date.parse(updatedTodo.startTime)}
              selected={Date.parse(updatedTodo.startTime)}
              onChange={(date) => handleStartTime(date)}
              selectsStart
              startDate={Date.parse(updatedTodo.startTime)}
              endDate={Date.parse(updatedTodo.endTime)}
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
          <i className="bi bi-calendar-check"></i>
          <div className="date">
            <DatePicker
              name="endtime"
              required={true}
              value={Date.parse(updatedTodo.endTime)}
              selected={Date.parse(updatedTodo.endTime)}
              onChange={(date) => handleEndTime(date)}
              selectsEnd
              startDate={Date.parse(updatedTodo.startTime)}
              endDate={Date.parse(updatedTodo.endTime)}
              minDate={Date.parse(updatedTodo.startTime)}
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
      <SubmitButton className={"submit-btn-medium"} title={formConstants.update} />
      </div>
    </form>
  );
};

export default UpdateTodoForm;
