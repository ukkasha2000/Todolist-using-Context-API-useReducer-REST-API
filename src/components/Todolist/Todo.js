import React, { useContext, useEffect, useState } from 'react';
import Task from '../Task/Task';
import './Todo.css';
import TodoTasks from "../../Context/TodoTaskContextProvider";
import axios from 'axios';


const Todo = () => {
  // const { tasks, setTasks, isShowEditBtn, setIsShowEditBtn, taskInput, setTaskInput, updateID } = useContext(TodoTasks);
  const { state, dispatch } = useContext(TodoTasks);
  let check = false, check2 = false;
  const [listToShow, setListToShow] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value,"sa")
    check = false;
    state.tasks.map((currentElement) => {
      if (currentElement.todo.toLowerCase() === state.taskInput.toLowerCase()) {
        check = true;
      }
    })
    if (check === true) {
      alert("Task Already Exists")
    }
    else if (check === false) {
      async function postData() {
        await axios.post('http://localhost:3232/todos', { "todo": state.taskInput })
          .then(function (responce) {
            dispatch({ type: "ADD_TODO", payload: { id: state.tasks[state.tasks.length - 1].id + 1, todo: state.taskInput } })
            // setTasks([...tasks, { id: tasks[tasks.length - 1].id +1, todo: taskInput }]);
            // console.log(tasks[tasks.length - 1].id +1);
          })
          .catch((error) => alert(error));
      }
      postData();
      dispatch({ type: "CLEAR_TASK_INPUT" })
      // setTaskInput("");

    }
  }

  const updateTask = (e) => {
    e.preventDefault();
    state.tasks.map((currentElement) => {
      if (currentElement.id === state.updateID) {
        check2 = false;
        state.tasks.map((currEle) => {
          if (currEle.todo.toLowerCase() === state.taskInput.toLowerCase()) {
            check2 = true;
          }
        })
        if (check2 === true) {
          alert("Task Already Exists");
        }
        else {
          async function updateData() {
            await axios.patch(`http://localhost:3232/todos/${currentElement.id}`, { "todo": state.taskInput })
              .then(function (responce) {
                dispatch({ type: "UPDATE_TASK" });
              })
              .catch((error) => alert(error));
          }
          updateData();
        }
      }
    })
    // setIsShowEditBtn(true);
    // setTaskInput("");
  }

  useEffect(() => {
  if (state.taskInput === "") {
    setListToShow(state.tasks);
    console.log(listToShow,"a",state.tasks);
  }
  else {
    setListToShow(() => {
      return state.tasks.filter((current) => current.todo.toLowerCase().includes(state.taskInput.toLowerCase()));
    });
  }
}, [state]);

  // Filtering Todos
  // useEffect(() => {
  //   if (taskInput === "") {
  //     setListToShow(tasks);
  //   }
  //   else {
  //     setListToShow(() => {
  //       return tasks.filter((current) => current.todo.toLowerCase().includes(taskInput.toLowerCase()));
  //     })
  //   }
  // }, [taskInput, tasks]);

  return (
      <>
        <div className='mainDiv'>
          <div className='todo-form-div'>
            <h2 className='addNewTaskHeading'>Add New Task</h2>
            <form onSubmit={state.isShowEditBtn ? handleSubmit : updateTask} className='todo-form'>
              <input type="text" id="todo-form-inputField" className='todo-form-input' placeholder='Task Name'
                required value={state.taskInput} onChange={(e) => {
                  // setTaskInput(e.target.value);
                  dispatch({type:"CHANGE_TASK_INPUT",payload:e.target.value})
                }} />
              {state.isShowEditBtn ?
                <button type='submit' id="todo-form-submit">
                  <i className="fa fa-check"></i>
                </button>
                :
                <button type='submit' id='updateListButton'>Update</button>
              }
            </form>
          </div>
          <div className='todoListDiv'>
            {
              listToShow.map((currentElement, index) => <Task value={currentElement} ind={index} key={index} />)
            }
          </div>
        </div>


      </>
    )
  }

  export default Todo;