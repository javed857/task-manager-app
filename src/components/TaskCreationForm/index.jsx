import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { lStorage } from "../../utilities/storage";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// import "../../assets/styles/create-edit.css";

const TaskCreationForm = () => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState(
    lStorage.get("taskList") ? lStorage.get("taskList") : []
  );
  const { state } = useLocation();
  const id = useParams();

  const getLstorageData = lStorage.get("taskList");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const addList = (inputObj) => {
    setTaskList([...taskList, inputObj]);
  };

  const onSubmit = (data) => {
    if (id?.id) {
      const structuredData = {
        id: Math.floor(Math.random() * Date.now()),
        ...data,
      };
      const objectToReplace = getLstorageData?.find(
        (arrayItem) => arrayItem.id === Number(id?.id)
      );
      Object.assign(objectToReplace, structuredData);

      lStorage.set("taskList", getLstorageData);
      reset();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      const structuredData = {
        id: Math.floor(Math.random() * Date.now()),
        ...data,
      };
      addList(structuredData);
      reset();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const editData = async (data) => {
    const fields = ["title", "description"];
    fields.forEach((field) => setValue(field, data?.[field]));
  };

  useEffect(() => {
    if (state) {
      const { task } = state;
      editData(task);
    }
  }, [state]);

  useEffect(() => {
    if (taskList?.length > 0) {
      lStorage.set("taskList", taskList);
    }
  }, [taskList]);

  return (
    <div className="task_view_wrapper">
      <p className="edit_heading_text">
        {id?.id ? `Task - ${state?.task?.title}` : "Create Task"}
      </p>
      <div className="form_section">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input_field_container">
            <input
              {...register("title", {
                required: true,
                pattern: /^\S[a-zA-Z ]*$/,
                maxLength: 120,
              })}
              placeholder="Title"
              className="title_input_field"
            />
            <span className="required_field_error">
              {errors.title?.type === "required" && "Title is required."}
            </span>
          </div>
          <div className="textArea_field_container">
            <textarea
              name="description"
              {...register("description", {
                pattern: /^[A-Za-z0-9\s\/? .,_-]+$/,
                maxLength: 120,
              })}
              placeholder="Description"
              className="desc_input_field"
            />
          </div>
          <div className="submit_btn_container">
            <input type="submit" className="submit_btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreationForm;
