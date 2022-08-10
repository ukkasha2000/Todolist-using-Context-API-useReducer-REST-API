import React from 'react'

export const initialState = {
    tasks: [],
    isShowEditBtn: true,
    taskInput: "",
    updateID: 0
  };

    export const reducer = (state = initialState, action) => {
        switch (action.type) {
          case "GET_DATA":
            // console.log(action.payload);
            return { ...state, tasks: action.payload }
          case "CHANGE_TASK_INPUT":
            return { ...state, taskInput: action.payload };
          case "ADD_TODO":
            return { ...state, tasks: [...state.tasks, action.payload], taskInput: "" };
          case "CLEAR_TASK_INPUT":
            return { ...state, taskInput: "" };
          case "DELETE_TASK":
            return {
              ...state, tasks: state.tasks.filter((currentElement) => {
                return currentElement.id !== action.payload;
              })
            };
          case "EDIT_TASK":
            // console.log(action.payload.todo,"aa",action.payload.id)
            return { ...state, taskInput: action.payload.todo, updateID:action.payload.id, isShowEditBtn: false }
          case "UPDATE_TASK":
            // console.log(state)
            return { ...state, tasks: state.tasks.filter((currentElement)=>{
              if(currentElement.id === state.updateID){
                currentElement.todo = state.taskInput;
              }
            }),taskInput:"", isShowEditBtn: true}
          default:
            return state;
        }
      }
