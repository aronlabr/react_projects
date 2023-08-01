import { useState } from "react"
import './TodoItem.css'

function TodoItem({ text, completed, onComplete, onDelete }) {
    return (
        <>
            <li className="TodoItem">
                <button className="contrast" onClick={onComplete}>
                    {completed ? "✅" : "✓"}
                </button>
                <p className={`TodoItem-p ${completed && "TodoItem-p--complete"}`}>
                    {text}
                </p>
                <span>{completed ? ("🟢") : ("") }</span>
                <button className="secondary" onClick={onDelete}>❌</button>
            </li>
            <hr/>
        </>
    )
}

function TodoList({ children }) {
    return ( 
        <article>
            <ul>{children}</ul> 
        </article>
    )
}

function TodoSearch({ searchValue, setSearchValue }) {
    return (
        <input type="search" placeholder="Item" value={searchValue}
            onChange={(event) => {setSearchValue(event.target.value)}}/>
    )
}

function TodoCounter({ total, completed }) {
    return (
        <>
            {completed === total ?
            <h1>Has completado todos tus TODOS 🥳</h1> :
            <h1>
                Se han completado <span>{completed}</span> de <span>{total}</span> de  TODOs.
            </h1>}
        </>
    )
}

function CreateTodobtn({onCreate}) {
    return(
        <button onClick={onCreate}>➕</button>
    )
}

const defaultTodos = [
    { text: 'Cortar cebolla', completed: true },
    { text: 'Tomar el Curso de Intro a React.js', completed: false },
    { text: 'Llorar con la Llorona', completed: false },
    { text: 'LALALALALA', completed: false },
    { text: 'Usar estados derivados', completed: true },
  ];

function App() {
    const [todos, setTodos] = useState(defaultTodos)
    const [searchValue, setSearchValue] = useState('')

    let completedTodos = todos.filter(todo => !!todo.completed).length
    let totalTodos = todos.length

    const doCompleteTodo = (text) => {
        const newTodos = [...todos]
        const todoIndex = newTodos.findIndex((todo) => todo.text === text)
        newTodos[todoIndex].completed = true
        setTodos(newTodos)
    }
    const doDeleteTodo = (text) => {
        const newTodos = [...todos]
        const todoIndex = newTodos.findIndex((todo) => todo.text === text)
        newTodos.splice(todoIndex,1)
        setTodos(newTodos)
    }

    const doCreateTodo = (text) => {
        const newTodo = {text, completed:false}
        setTodos([...todos, newTodo])
    }

    let searchTodos = searchValue === '' ? todos : todos.filter(
        (todo) => {
            const todoText =  todo.text.toLowerCase()
            const searchText = searchValue.toLowerCase()
            return todoText.includes(searchText)
    })

    return (
        <>
            <TodoCounter completed={completedTodos} total={totalTodos}/>
            <TodoSearch {...{searchValue, setSearchValue}}/>
            <TodoList>
                {searchTodos.map( todo => (
                    <TodoItem key={todo.text} {...todo} 
                    onComplete={()=>{doCompleteTodo(todo.text)}}
                    onDelete={()=>{doDeleteTodo(todo.text)}} />
                ))}
            </TodoList>
            <CreateTodobtn onCreate={()=>{doCreateTodo(searchValue)}}/>
        </>
    );
}

export { App }