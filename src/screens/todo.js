import React, { useContext } from 'react';
import { TodosProvider } from '../contexts/todos.context';
import { AuthContext } from '../contexts/auth.context';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

function TodoApp() {
    const authy = useContext(AuthContext);

    return authy ? (
        <TodosProvider>
            <TodoForm />
            <TodoList />
        </TodosProvider>
    ) : null;
}

export default TodoApp;
