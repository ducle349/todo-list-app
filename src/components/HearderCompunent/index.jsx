import { Button, Input } from "antd";
import "./style.scss";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllTask,
  setNewPage,
  setSearchKey,
} from "../../redux/features/tasks/taskSlice";
import { TASK_STATUS } from "../../constants/task.constant";

const HeaderCompunent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchKey = useSelector((state) => state.task.searchKey);
  const pagination = useSelector((state) => state.task.pagination);
  const handledirectAddTask = () => {
    navigate(ROUTES.ADD_NEW);
  };
  const computedCurrentStatusSearch = (pathName) => {
    switch (pathName) {
      case "/all-task":
        return "";
      case "/new-task":
        return TASK_STATUS.NEW;
      case "/doing-task":
        return TASK_STATUS.DOING;
      case "/done-task":
        return TASK_STATUS.DONE;
      default:
        return "";
    }
  };
  const location = useLocation;
  console.log(location);
  const handleSeachTask = (e) => {
    e.prevenDefault();
    const statusSearch = computedCurrentStatusSearch(location.pathName);
    dispatch(
      actFetchAllTask({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        ...(!!statusSearch ? { status: statusSearch } : {}),
      })
    );
    dispatch(setNewPage(1));
  };
  const handleChangeInputTask = (e) => {
    const value = e.target.value;
    dispatch(setSearchKey(value));
  };
  return (
    <div className="header-container">
      <div>
        <Button onClick={handledirectAddTask}>Create New Task</Button>
      </div>
      <form
        className="header-container__search-area"
        onSubmit={handleSeachTask}
      >
        <Input
          placeholder="input"
          value={searchKey}
          onChange={handleChangeInputTask}
        ></Input>
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
};

export default HeaderCompunent;
