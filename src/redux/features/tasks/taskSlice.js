import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskAPIs } from "../../../apis/taskApis";
import { message } from "antd";
const initiaState = {
  isLoading: false,
  tasks: [],
  currentTask: {},
  errors: {},
  pagination: {
    currentPage: 1,
    limitPerPage: 8,
    total: 8,
  },
  searchKey: "",
};

export const actFetchAllTask = createAsyncThunk(
  "tasks/fetchAllTask",
  async (params = {}) => {
    const response = await TaskAPIs.getAllTasks(params);
    return {
      data: response.data,
      total: response.headers.get("X-Total-Count"),
    };
  }
);
export const actFetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (taskId) => {
    const task = await TaskAPIs.getTaskById(taskId);
    return task;
  }
);
export const actDeleteTaskById = createAsyncThunk(
  "tasks/deleteTaskById",
  async (id) => {
    await TaskAPIs.deleteTaskById(id);
    return null;
  }
);
export const actupdateTaskById = createAsyncThunk(
  "tasks/updateTaskById",
  async ({ id, taskUpdate }) => {
    await TaskAPIs.updateTaskById(id, taskUpdate);
    return null;
  }
);
const taskSlice = createSlice({
  name: "tasks",
  initialState: initiaState,
  reducers: {
    actSetTasks: (state, action) => {},
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetCurrentTask: (state, action) => {
      state.currentTask = {};
    },
    setNewPage: (state, action) => {
      state.pagination = {
        ...state.pagination,
        currentPage: action.payload,
      };
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actFetchAllTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actFetchAllTask.rejected, (state, action) => {
      state.errors = {};
      state.isLoading = false;
    });
    builder.addCase(actFetchAllTask.fulfilled, (state, action) => {
      state.tasks = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(actFetchTaskById.fulfilled, (state, action) => {
      state.currentTask = action.payload;
      state.isLoading = false;
      state.pagination.total = action.payload.total;
    });
    builder.addCase(actupdateTaskById.fulfilled, (state, action) => {
      message.success("cập nhật task thành công");
    });
    builder.addCase(actDeleteTaskById.fulfilled, (state, action) => {
      message.success("xoa task thành công");
    });
  },
});
export const actCreateNewTask = (task) => {
  return async (dispatch) => {
    try {
      await TaskAPIs.createTask(task);
      message.success("tao task thanh cong");
    } catch (error) {}
  };
};
export const { actSetTasks, setLoading, setNewPage, setSearchKey } =
  taskSlice.actions;
export const tasksReducer = taskSlice.reducer;
