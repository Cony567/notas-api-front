//es importante utilizar este import para que funcione la aplicació ya que más abajo se hace uso de jsx
import React, {useState, useEffect} from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const initialTodos = [
    {
        id:1,
        title: 'Nota mental',
        description: 'Agrega Notas a tu lista no lo olvides',
        completed: false
    },
];


const localTodos = JSON.parse(localStorage.getItem('todos'));

//Si retornamos más de un elemento nos va a tirar error, 
//es bueno utilizar un contenedor para evitar este error posteriormente
const App =()=>{
    const [todos, setTodos] = useState(localTodos || initialTodos);
    const [todoEdit, setTodoEdit] = useState(null);
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])
    const actualizarTodosAPI = async ()=>{
        const url = 'http://localhost:3001/api/notes';
        const res = await fetch(url);
        const nuevasNotas = await res.json();
        console.log(nuevasNotas);
        setTodos(nuevasNotas);
        
    }

    const todoDelete = (todoId) => {
        if(todoEdit && todoId === todoEdit.id){
            setTodoEdit(null);
        }
        const changedTodos = todos.filter(todo => todo.id !== todoId);
        setTodos(changedTodos);
    }

    const todoToogCompleted = (todoId) =>{
        // const changedTodos = todos.map(todo => {
        //     const todoEdit = {
        //         ...todo,
        //         completed: !todo.completed
        //     }
            
        //     if(todo.id === todoId){
        //         return todoEdit;
        //     }else{
        //         return todo;
        //     }

        // });
        const changedTodos = todos.map(todo =>
            (todo.id === todoId ? {...todo, completed: !todo.completed} : todo));
        setTodos(changedTodos);
    }

    
    const todoAdd = (todo) => {
        const newTodo = {
            id: Date.now(),
            ...todo,
            completed: false
        };
        const changedTodos = [
            newTodo,...todos
        ];
        setTodos(changedTodos);
    }

    const todoUpdate = (todoEdit)=>{
        const changedTodos = todos.map(todo => (
            todo.id === todoEdit.id ? todoEdit : todo
        ));
        setTodos(changedTodos);
    }

    useEffect(()=>{
        actualizarTodosAPI();
    }, []);
    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-8'>
                    <TodoList 
                        todos = {todos}
                        todoDelete={todoDelete}
                        todoToogCompleted={todoToogCompleted}
                        setTodoEdit={setTodoEdit}
                    />
                </div>
                <div className='col-4'>
                    <TodoForm
                        todoAdd={todoAdd}
                        todoEdit={todoEdit}
                        todoUpdate={todoUpdate}
                        setTodoEdit={setTodoEdit}
                    />
                </div>
            
            </div>

        </div>
    );
}

export default App;