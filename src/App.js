import "antd/dist/reset.css";
import MainLayout from "./layouts/MainLayout";
import NewTasks from "./pages/NewTasks";
import DoingTasks from "./pages/DoingTasks";
import DoneTasks from "./pages/DoneTasks";
import AllTasks from "./pages/AllTasks";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import AddNewTask from "./pages/AddNewTasks";
import UpdateTask from "./pages/UpdateTask";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<AllTasks />} />
            <Route path={ROUTES.ALL_TASK} element={<AllTasks />} />
            <Route path={ROUTES.UPDATE_TASK} element={<UpdateTask />} />
            <Route path={ROUTES.NEW_TASK} element={<NewTasks />} />
            <Route path={ROUTES.DOING_TASK} element={<DoingTasks />} />
            <Route path={ROUTES.DONE_TASK} element={<DoneTasks />} />
            <Route path={ROUTES.ADD_NEW} element={<AddNewTask />} />
          </Route>
          <Route
            path={"/"}
            element={<Navigate to={ROUTES.ALL_TASK}> </Navigate>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
