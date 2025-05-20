import './style.css'
import { App } from './todos/app.js';
import todoStore from './store/todo.store.js';

//console.log('Hola mundo!');
todoStore.initStore();
App('#app');