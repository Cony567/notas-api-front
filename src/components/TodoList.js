import React, {useState} from 'react';
import Todo from './Todo';





const TodoList = ({todos, todoDelete, todoToogCompleted, setTodoEdit})=>{

    
    return (
        <div>
            <h1 className='text-center
             display-4'>Soy TodoList</h1>

            {
                todos.length === 0
                ? (<div className='alert alert-primary'>
                    {'No hay tareas. Por favor agrega una :)'}
                </div>) : (
                    todos.map(todo => (
                        <Todo 
                            todo={todo} 
                            key={todo.id}
                            todoDelete={todoDelete}
                            todoToogCompleted={todoToogCompleted}
                            setTodoEdit={setTodoEdit}
                        />
                    ))
                )
            }

        </div>
    );
};

export default TodoList;