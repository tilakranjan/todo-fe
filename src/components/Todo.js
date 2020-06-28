import React, { useContext, memo } from 'react';
import { DispatchContext } from '../contexts/todos.context';
import EditTodoForm from './EditTodoForm';
import useToggleState from '../hooks/useToggleState';
import useStyles from '../styles/TodoStyles.js';
import { REMOVE_TODO, TOGGLE_TODO } from '../constants/actions';
import { EditTodo, DeleteTodo } from '../actions/todo';
import { AuthContext } from '../contexts/auth.context';

function Todo(todoData) {
  const { todo_id, todo, isDone } = todoData;
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const [isEditing, toggle] = useToggleState(false);
  const authy = useContext(AuthContext);

  if (isEditing) {
    return (
      <li
        className={classes.Todo}
        style={{ overflowY: 'hidden' }}
        onClick={() => toggle()}
      >
        <EditTodoForm id={todo_id} task={todo} data={todoData} toggleEditForm={toggle} />
      </li>
    );
  }

  return (
    <li
      className={classes.Todo}
      onClick={() => {
        let newData = {...todoData};
        newData.isDone = !newData.isDone;
        EditTodo({data:newData, uid: authy.attributes.email}, (addRes)=>{
          dispatch({ type: TOGGLE_TODO, todo_id })
        })
      }}
    >
      <span
        style={{
          textDecoration: isDone ? 'line-through' : '',
          color: isDone ? '#bdc3c7' : '#34495e'
        }}
      >
        {todo}
      </span>
      <div className={classes.icons}>
        <i
          style={{ color: '#c0392b' }}
          className="fas fa-trash"
          onClick={e => {
            e.stopPropagation();
            DeleteTodo({tid:todoData.timestamp, uid: authy.attributes.email}, (delRes)=>{
              dispatch({ type: REMOVE_TODO, todo_id });
            })
          }}
        />
        <i
          style={{ color: '#58b2dc' }}
          className="fas fa-pen"
          onClick={e => {
            e.stopPropagation();
            toggle();
          }}
        />
      </div>
    </li>
  );
}

export default memo(Todo);
