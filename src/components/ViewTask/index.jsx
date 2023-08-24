import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { lStorage } from "../../utilities/storage";
import Backbtn from "../../assets/images/back.jpg";
import Editbtn from "../../assets/images/edit.jpg";
import Deletebtn from "../../assets/images/delete.jpg";
import "../../assets/styles/viewtask.css";

const ViewTask = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { task } = state;

  const taskList = lStorage.get("taskList");

  const editTask = (data) => {
    navigate(`/create/${data.id}`, { state: { task: data } });
  };

  const deleteTask = (data) => {
    taskList.splice(
      taskList.findIndex((a) => a.id === data.id),
      1
    );
    lStorage.set("taskList", taskList);
    navigate("/");
  };

  return (
    <div className="view_task_wrapper">
      <h4 className="view_task_title">Title : {task?.title}</h4>
      <p className="view_task_desc">Description : {task?.description}</p>
      <div className="action_container">
        <div className="back_btn" onClick={() => navigate("/")}>
          <span className="back_icon_box">
            <img src={Backbtn} alt="back_icon" className="back_icon" />
          </span>
          <span className="action_btn_text">Back</span>
        </div>
        <div className="edit_btn" onClick={() => editTask(task)}>
          <span className="edit_icon_box">
            <img src={Editbtn} alt="edit_icon" className="edit_icon" />
          </span>
          <span className="action_btn_text">Edit</span>
        </div>
        <div className="delete_btn" onClick={() => deleteTask(task)}>
          <span className="delete_icon_box">
            <img src={Deletebtn} alt="delete_icon" className="delete_icon" />
          </span>
          <span className="action_btn_text">Delete</span>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
