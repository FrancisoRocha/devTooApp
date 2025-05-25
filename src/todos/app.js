import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderPendingTodos, renderTodos } from './use-cases';
import deleteCompleted from '../store/todo.store';


const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    Destroy: '.destroy',
    ClearCompletd: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCount: '#pending-count', 
}

/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos )
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPendingTodos( ElementIDs.PendingCount );
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
    const cleatCompletdButton = document.querySelector( ElementIDs.ClearCompletd );
    const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters )

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

    cleatCompletdButton.addEventListener('click', () => {
        //console.log('Borrar')
        todoStore.deleteCompleted();
        displayTodos();
    })

    filtersLIs.forEach( element => {

        element.addEventListener('click', (element) => {

            filtersLIs.forEach( el => el.classList.remove('selected') );
            element.target.classList.add('selected');

            switch( element.target.text){
                case 'Todos':
                    todoStore.setFilter( Filters.All )
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                break;
            }
            displayTodos();
        });
    });

}

