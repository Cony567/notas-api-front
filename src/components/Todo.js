import React from 'react';

const Todo = ({todo, todoDelete, todoToogCompleted, setTodoEdit})=>{
    return (
        <div className='card mt-2'>
            <div className='card-body'>
                <div className='text-end'>
                    <h3 className='card-title'>
                        {todo.title}
                        <button 
                            className={`btn btn-sm ${todo.completed ? 'btn-outline-success' : 'btn-success'} ms-2`}
                            onClick={()=> todoToogCompleted(todo.id)}
                        >
                            {todo.completed ? 'Terminado' : 'Terminar'}
                        </button>
                    </h3>
                    <p className='card-text'>
                        {todo.description}
                    </p>
                </div>
                <hr/>
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-outline-primary btn-sm me-4'
                        onClick={() => setTodoEdit(todo)}
                    >
                        Editar</button>
                    <button 
                        className='btn btn-outline-danger btn-sm' 
                        onClick={() => todoDelete(todo.id)}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Todo;