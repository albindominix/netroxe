import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';

const tasksCollectionRef = collection(db, 'tasks');

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (userId) => {
  const response = await getDocs(tasksCollectionRef);

  const taskList = response.docs.map((doc) => ({ id: doc.id, ...doc.data() })).filter((task)=>task.userId===userId);
  console.log(taskList,'userId')

  return taskList;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await addDoc(tasksCollectionRef, task);
  return { id: response.id, ...task };
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await deleteDoc(doc(tasksCollectionRef, id));
  return id;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, name, userId }) => {
  // await updateDoc(doc(tasksCollectionRef, id), task);
  // return { id, ...task };
  const taskRef = doc(tasksCollectionRef, id);
  await updateDoc(taskRef, { name, userId });
  return { id, name, userId };
});

const TasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    clearTasks: (state) => {
      return [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        return state.filter((task) => task.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.findIndex((task) => task.id === action.payload.id);
        state[index] = action.payload;
      });
  },
});
export const { clearTasks } = TasksSlice.actions;
export default TasksSlice.reducer;
