import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../assets/images/delete_icon.svg";
import AddIcon from "../../assets/images/add_icon.svg";

import { lStorage } from "../../utilities/storage";
// import "../../assets/styles/tasklist.css";

const TaskList = () => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState(lStorage.get("taskList") ? lStorage.get("taskList") : []);

  const editTask = (data) => {
    navigate(`/create/${data.id}`, { state: { task: data } });
  };

  const viewTask = (data) => {
    navigate(`/view/${data.id}`, { state: { task: data } });
  };

  const fetchTaskOnDelete = () => {
    setTaskList(lStorage.get("taskList"));
  };

  const deleteTask = (data) => {
    taskList.splice(
      taskList.findIndex((a) => a.id === data.id),
      1
    );
    lStorage.set("taskList", taskList);
    fetchTaskOnDelete();
  };

  return (
    <>
{taskList?.length > 0 &&
<>
<h1 className="list_heading_text">Today's Task </h1>
      <div className="task_list_wrapper">
        {taskList &&
          taskList?.map((item) => {
            return (
              <section className="list_section" key={item?.id}>
                <div className="task_container">
                  <div className="name_wrapper">
                    <input
                      type="radio"
                      name="selected_task"
                      className="selection_checkBox"
                      readOnly
                    />
                    <p className="taskName">{item?.title}</p>
                  </div>
                  <div className="action_container">
                    <button className="edit_btn" onClick={() => editTask(item)}>
                      Edit
                    </button>
                    <button className="view_btn" onClick={() => viewTask(item)}>
                      View
                    </button>
                    <button
                      className="delete_btn"
                      onClick={() => deleteTask(item)}
                    >
                      <img src={DeleteIcon} alt="bin_icon" />
                    </button>
                  </div>
                </div>
              </section>
            );
          })}
      </div>
      </>}
      {
        taskList?.length <= 0 &&
        <div  className="empty_task_wrapper">
          <div className="empty_task_container">
          <h1 className="empty_task_title">No Tasks Found</h1>
          <h4 className="empty_task_sub_title">
            Create New Tasks
          </h4>
          <img
            src={AddIcon}
            alt="win"
            className="add_icon_image"
            title="Create New Task"
            style={{
              paddingRight: "20px",
              cursor: "pointer",
              width:"50px"
            }}
            onClick={() => navigate("/create")}
          />
        </div>
        </div>
      }
    </>
  );
};

export default TaskList;
