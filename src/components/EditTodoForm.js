import React, { useContext } from 'react';
import { DispatchContext } from '../contexts/todos.context';
import useInputState from '../hooks/useInputState';
import useStyles from '../styles/EditTodoFormStyles.js';
import { EDIT_TODO } from '../constants/actions';
import { EditTodo } from '../actions/todo';
import { AuthContext } from '../contexts/auth.context';

function EditTodoForm({ id, task, data, toggleEditForm }) {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const [value, handleChange, clearValue] = useInputState(task);
  const authy = useContext(AuthContext);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        let newData = {...data};
        newData.todo = value;
        EditTodo({data:newData, uid: authy.attributes.email}, (addRes)=>{
          dispatch({ type: EDIT_TODO, newObj: addRes });
        })
        toggleEditForm();
        clearValue();
      }}
      className={classes.EditTodoForm}
    >
      <input
        autoFocus
        value={value}
        onChange={handleChange}
        onClick={e => e.stopPropagation()}
        className={classes.input}
      />
    </form>
  );
}

export default EditTodoForm;
