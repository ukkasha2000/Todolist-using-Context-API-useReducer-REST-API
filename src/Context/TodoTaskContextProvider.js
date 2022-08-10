import axios from 'axios';
import React, { createContext, useEffect, useState, useReducer } from 'react';
import { reducer, initialState } from '../Reducer/TodoReducer';

const TodoTasks = createContext();




export const TodoTaskContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  // const [tasks, setTasks] = useState([]);
  // const [isShowEditBtn, setIsShowEditBtn] = useState(true);
  // const [taskInput, setTaskInput] = useState("");
  // const [updateID, setUpdateID] = useState();

  useEffect(() => {
    async function getData() {
      await axios.get('http://localhost:3232/todos')
        .then(function (resp) {
          // setTasks(resp.data);
          // console.log(resp.data)
          dispatch({ type: "GET_DATA", payload: resp.data })

        }).catch(function (error) {
          alert(error);
        })
    }
    getData();
  }, []);


  return (
    // <TodoTasks.Provider value={{ tasks, setTasks, isShowEditBtn, setIsShowEditBtn, taskInput, setTaskInput, updateID, setUpdateID }}>
    <TodoTasks.Provider value={{ state, dispatch }}>
      {children}
    </TodoTasks.Provider>
  )
}

export default TodoTasks;

