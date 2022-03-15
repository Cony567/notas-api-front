import React, {useState, useEffect} from 'react';
const initialFormValues = {
    title: '',
    description: ''
}
const TodoForm = ({todoAdd, todoEdit, todoUpdate, setTodoEdit})=>{

    const [formValues, setFormValues] = useState(initialFormValues); 
    const {title, description} = formValues;
    const [error, setError]  = useState(null);
    const [successMessage, setSuccessMessage]  = useState(null);

    useEffect(()=>{
        if (todoEdit) {
            setFormValues(todoEdit);
        }else{
            setFormValues(initialFormValues);
        }
        
    },[todoEdit]);
    const handleInputChange = (e)=>{

        const changedFormValues = {
            ...formValues,
            [e.target.name] : e.target.value
        }
        setFormValues(changedFormValues);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (title.trim() === '') {
            setError('Debes indicar un título');
            return;
        }

        if (description.trim() === '') {
            setError('Debes indicar una descripción');
            return;
        }
        if (todoEdit) {
            todoUpdate(formValues);
            setSuccessMessage('Actualizado Con exito');
        }else{
            todoAdd(formValues);
            setSuccessMessage('Agregado Con exito');
            setFormValues(initialFormValues);
        }
        //trabajando sobre la lógica de estados
        
        setTimeout(()=>{
            setSuccessMessage(null);
        }, 2000)
        setError(null);
    }
    return (
        <div>
            <h2 className='text-center display-4'>{todoEdit ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
            {
                todoEdit  && (
                <button
                    className='btn btn-sm btn-warning mb-2'
                    onClick={()=>setTodoEdit(null)}
                >
                    Cancelar Editar
                </button>)
            }
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    placeholder='Título' 
                    className='form-control'
                    value={title}
                    name='title'
                    onChange={handleInputChange}
                />
                <textarea 
                    placeholder='Descripción' 
                    className='form-control mt-2'
                    value={description}
                    name='description'
                    onChange={handleInputChange}
                >
                </textarea>
                <button 
                    className='btn btn-primary mt-2 btn-sm'
                >
                    {todoEdit ? 'Actualizar': 'Agregar'}
                </button>
            </form>
            {
                error && (<div className='alert alert-danger mt-2'>{
                    error
                }</div>)
            }
            {
                successMessage && (
                    <div className='alert alert-success mt-2'>
                        {
                            successMessage
                        }
                    </div>
                )
            }
        </div>
    );
}

export default TodoForm;