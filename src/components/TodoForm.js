import React, { useContext } from 'react';
import { DispatchContext } from '../contexts/todos.context';
import useInputState from '../hooks/useInputState';
import useStyles from '../styles/TodoFormStyles';
import { ADD_TODO } from '../constants/actions';
import { AuthContext } from '../contexts/auth.context';
import { AddTodo } from '../actions/todo';

function TodoForm() {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const [value, handleChange, clearValue] = useInputState('');
  const authy = useContext(AuthContext);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        AddTodo({task: value, uid: authy.attributes.email}, (addRes)=>{
          console.log("@addRes");
          console.log(addRes);
          dispatch({ type: ADD_TODO, data: addRes });
        })
        clearValue();
      }}
      className={classes.TodoForm}
    >
      <input
        placeholder="Add your task here..."
        value={value}
        onChange={handleChange}
        className={classes.input}
      />
    </form>
  );
}

export default TodoForm;
