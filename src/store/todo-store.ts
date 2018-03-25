
interface ITodoState {
    todos: Array<any>,
    isPending: boolean
}

let initialState: ITodoState = {
    todos: new Array<any>(),
    isPending: false
};

const reducer = (state: ITodoState = initialState, action) => {

    switch (action.type) {
        case "ADD_TODO": {
            return { ...state, todos: [...state.todos, action.todoEntry] };
        }
        case "REMOVE_TODO": {
            let updatedTodos = state.todos.filter((todo) => {
                return todo.id !== action.id;
            });
            return { ...state, todos: updatedTodos };
        }
        case "UPDATE_TODO": {
            let updatedTodos = state.todos.filter((todo) => {
                if (todo.id == action.todo.id) {
                    return action.todo
                } else {
                    return todo
                }
            });
            return { ...state, todos: updatedTodos };
        }

        default:
            return state;
    }
};


export default reducer;
