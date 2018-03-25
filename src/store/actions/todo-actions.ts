//import { firebaseAPI } from "./../../helpers/firebase-service";

export const addTodo = (todoEntry) => async (dispatch, _getState) => {
    
    todoEntry.id =  new Date().getTime() + "";
    todoEntry.created = new Date()
    return dispatch({
        type: "ADD_TODO",
        todoEntry
    });
};

export const deleteTodo = (id: string) => async (dispatch, _getState) => {
    return dispatch({
        type: "REMOVE_TODO",
        id
    });
};

