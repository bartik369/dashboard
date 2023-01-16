import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadTodos } from "../../../store/actions/todosActions";
import { useForm } from "react-hook-form";
import SubmitButton from "../../UI/buttons/SubmitButton";
import * as formConstants from "../../../utils/constants/form.constants";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import "../../form/forms.css";
import "react-datepicker/dist/react-datepicker.css";

const UpdateTodoForm = ({ update }) => {
  
  const todo = useSelector((state) => state.todo.todo);
  const [updatedTodo, setUpdatedTodo] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
    startTime: "",
    endTime: "",
    user: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
    setUpdatedTodo(todo)
    reset(todo);
  }, [todo]);

  // useEffect(() => {
  //   setUpdatedTodo(todo)
  //   reset(todo);
  // }, [todo])

  console.log("up")
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: todo,
  });

  const onSubmit = (data) => {
    const updateTodoData = {
      ...updatedTodo,
      id: todo._id,
      title: data.title,
      description: data.description,
      status: todo.status,
      startTime: updatedTodo.startTime,
      endTime: updatedTodo.endTime,
      user: updatedTodo.user,
    };
    update(updateTodoData);
    reset();
  };

  const handleStartTime = (date) => {
    setUpdatedTodo({ ...updatedTodo, startTime: date });
  }

  const handleEndTime = (date) => {
    setUpdatedTodo({ ...updatedTodo, endTime: date });
  }

  return (
    <form className="content-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="content-form__title">{formConstants.updateTodoTitle}</div>
      <div className="form-error">
        {errors.title && <p>{errors.title.message || "Error"}</p>}
      </div>
        <input
          className="content-form__input"
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
        className="content-form__input"
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
      <div className="content-form__date">
        <div className="start">
          <i className="bi bi-calendar3"></i>
          <div className="date">
            <DatePicker
              name="starttime"
              required={true}
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
      <div className="content-action-btn">
      <SubmitButton className={"submit-btn-medium"} title={formConstants.update} />
      </div>
    </form>
  );
};

export default UpdateTodoForm;
