import { Todo } from "../todos/models/todo.model"

const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new Todo('Probar JavaScript'),
        new Todo('Piedra del alma'),
        new Todo('Piedra del tiempo')
        
    ],
    filter: Filters.All,
}

const initStore = () => {
    console.log(state)
    console.log('InitStore 🥑')
}

export default {
    initStore,
}