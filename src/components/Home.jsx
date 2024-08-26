import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  fetchTasks,
  deleteTask,
  clearTasks,
  updateTask,
} from "../Redux/slices/TasksSlice";
import Modal from "./Modal";

function Home() {
  const { signOut } = useAuth();

  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [editId, setEditId] = useState(null);
  const tasks = useSelector(({ TasksSlice }) => TasksSlice);
  const user = useSelector(({ UserSlice }) => UserSlice.user);
  useEffect(() => {
    if (user && user.uid) {
      dispatch(fetchTasks(user.uid));
    }
  }, [dispatch, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() !== "" && user && user.uid) {
      dispatch(addTask({ name: taskName, userId: user.uid }));
      setTaskName("");
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (taskName.trim() !== "" && user && user.uid && editId) {
      dispatch(updateTask({ id: editId, name: taskName, userId: user.uid }));
      setTaskName("");
      setEditId(null); // Reset edit mode
    }
  };
  return (
    <div className="flex font-poppins items-center justify-center">
      <div className="h w-screen flex flex-col justify-center items-center dark:bg-gray-900 ">
        <div
          className="flex w-full justify-end cursor-pointer p-4"
         
        >
          <span 
           onClick={async () => {
            await signOut();
            dispatch(clearTasks());
          }}className="text-blue-500 transition duration-300 border border-blue-400 p-3 rounded-md hover:bg-blue-600 hover:text-white">
            Logout
          </span>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg p-10 m-2">
            <h1 className="pb-6 font-bold dark:text-gray-400 text-4xl text-center cursor-default">
              Task Manager
            </h1>

            <form
              onSubmit={editId ? handleUpdate : handleSubmit}
              className="space-y-4 mb-6"
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Add a new task"
                  className="w-full border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg p-3 text-white rounded-lg hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                >
                  {editId ? "Update Task" : "Add Task"}
                </button>
              </div>
            </form>

            <div className="space-y-4 overflow-auto h-[20rem] ">
              {tasks?.map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg gap-3"
                >
                  <span className="font-medium truncate dark:text-gray-300 w-96">
                    {task.name}
                  </span>
                  <div className="flex gap-1">
                    <button
                      className="text-black border border-gray-400 px-3 py-1 rounded-lg  transition duration-300  hover:bg-blue-600 hover:text-white "
                      onClick={() => {
                        setTaskName(task.name);
                        setEditId(task.id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                      onClick={() => {
                        setTaskId(task.id);
                        setOpenModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Modal isOpen={openModal} close={() => setOpenModal(!openModal)}>
          <DeleteModal
            setOpenModal={setOpenModal}
            handleDelete={() => dispatch(deleteTask(taskId))}
          />
        </Modal>
      </div>
    </div>
  );
}
const DeleteModal = ({ setOpenModal, handleDelete }) => {
  return (
    <div className="w-[450px] p-6 flex flex-col gap-8 bg-white rounded-xl">
      <div className="w-full flex justify-between">
        <span>Are you sure you want to delete?</span>
        <span className="cursor-pointer" onClick={() => setOpenModal(false)}>
          X
        </span>
      </div>
      <div className="w-full flex justify-end">
        <div className="flex gap-3">
          <span
            className="border border-gray-400 text-sm rounded-xl px-8 p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </span>
          <span
            className="border p-2 bg-red-500 text-sm rounded-xl px-8 text-white cursor-pointer hover:bg-red-600"
            onClick={() => {
              handleDelete();
              setOpenModal(false);
            }}
          >
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};
export default Home;
