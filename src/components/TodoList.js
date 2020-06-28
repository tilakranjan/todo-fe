import React, { useContext, useEffect } from 'react';
import { TodosContext, DispatchContext } from '../contexts/todos.context';
import { AuthContext } from '../contexts/auth.context';
import Todo from './Todo';
import { GetTodos } from '../actions/todo';
import { ADD_TODOS } from '../constants/actions';

function TodoList() {
  const todos = useContext(TodosContext);
  const authy = useContext(AuthContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    GetTodos({uid: authy.attributes.email}, (todoRes)=>{
      dispatch({ type: ADD_TODOS, data: todoRes });
    })
  }, [authy.attributes.email, dispatch]);

  return (
    <ul style={{ paddingLeft: 10, width: '95%' }}>
      {todos && todos.length ? todos.map(todo => (
        <Todo key={todo.todo_id} {...todo} />
      )) : (
        <p>Nothing to do. Hurray!</p>
      )}
    </ul>
  );
}

export default TodoList;
