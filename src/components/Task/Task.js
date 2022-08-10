import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import TodoTasks from "../../Context/TodoTaskContextProvider"

const Task = ({ value, ind }) => {
    // const { tasks, setTasks, setIsShowEditBtn, setTaskInput, setUpdateID } = useContext(TodoTasks);
    const { state, dispatch } = useContext(TodoTasks);

    const deleteTaskFunc = (id) => {

        async function deleteData() {
            await axios.delete(`http://localhost:3232/todos/${id}`)
                .then(function (responce) {
                    // const removeItem = state.tasks.filter((currentElement) => {
                        dispatch({ type: "DELETE_TASK", payload: id });
                        // return currentElement.id != id;
                    // });
                    // setTasks(removeItem);
                })
                .catch((error) => alert(error));
        }
        deleteData();
    }

    //Edit TodoList
    const editTaskFunc = (dataa) => {
        dispatch({ type: "EDIT_TASK", payload: dataa });
    }
    return (
        <>
            <h2 className='todoListShow'>Task {ind + 1} : {value.todo}
                <div className='todoButtons'>
                    <button className='edit-task-button' onClick={() => editTaskFunc(value)}><i className="fa fa-pencil"></i></button>
                    <button className='del-task-button' onClick={() => deleteTaskFunc(value.id)}><i className="fa fa-trash"></i></button>
                </div>
            </h2>
        </>
    )
}

export default Task;