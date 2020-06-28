import {
  ADD_TODOS,
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  EDIT_TODO
} from '../constants/actions';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODOS:
      return [...action.data.Items];
    case ADD_TODO:
      return [...state, action.data];
    case REMOVE_TODO:
      return state.filter(todo => todo.todo_id !== action.todo_id);
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.todo_id === action.todo_id ? { ...todo, isDone: !todo.isDone } : todo
      );
    case EDIT_TODO:
      return state.map(todo =>
        todo.todo_id === action.newObj.todo_id ? action.newObj : todo
      );
    default:
      return state;
  }
};

export default reducer;
