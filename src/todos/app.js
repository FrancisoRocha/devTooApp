import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    Destroy: '.destroy',
}

/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos )
    }

    // Cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector( elementId ).append( app );
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUl = document.querySelector( ElementIDs.TodoList );
    const destroyButtons = document.querySelector( ElementIDs.Destroy );

    // Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if( event.keyCode !== 13 ) return;
        if(event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value ) 
        displayTodos();
        event.target.value = '';
    });

    todoListUl.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    todoListUl.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');
        if( event.target.className === 'destroy') {
            todoStore.deleteTodo( element.getAttribute('data-id'))
            displayTodos();
        }
    });

}

