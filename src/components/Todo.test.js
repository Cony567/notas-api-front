import '@testing-library/jest-dom'
import {fireEvent, render, Render} from '@testing-library/react'
import { prettyDOM } from '@testing-library/react';

import Todo from './Todo'

test('renders Content todo', () => {
    const todo = {
        
        id:4,
        title: 'todo XXX',
        description: 'desc del todo XXX',
        completed: false
        
    };

    const components = render(<Todo todo={todo}/>);

    components.getByText('Terminar');
    expect(components).toBeDefined();

    console.log(prettyDOM(components.container.querySelector('li')));

});

test('clic en el boton terminar todo', () => { 
    const todo = {
        
        id:4,
        title: 'todo XXX',
        description: 'desc del todo XXX',
        completed: false
        
    };

    const mookToog = jest.fn(

    );

    const components = render(<Todo todo={todo} todoToogCompleted={mookToog}/>);

    const button = components.getByText('Terminar');
    fireEvent.click(button);

    expect(mookToog.mock.calls).toHaveLength(1);
 });


