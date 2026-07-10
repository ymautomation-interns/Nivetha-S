import React, { useState } from "react";
import "./TodoApp.css";
function TodoApp() {

    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);


    // Add Todo
    const addTodo = () => {

        if(task.trim() === ""){
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: task,
            completed: false
        };

        setTodos([...todos, newTodo]);
        setTask("");

    };


    // Delete Todo
    const deleteTodo = (id) => {

        setTodos(
            todos.filter(todo => todo.id !== id)
        );

    };


    // Complete Todo
    const completeTodo = (id) => {

        setTodos(
            todos.map(todo =>
                todo.id === id
                ? {...todo, completed: !todo.completed}
                : todo
            )
        );

    };


    return (

        <div className="todo-container">

            <h2>Todo App</h2>


            <input

                type="text"

                placeholder="Enter task"

                value={task}

                onChange={(e)=>setTask(e.target.value)}

            />


            <button onClick={addTodo}>
                Add
            </button>



            <ul>

                {
                    todos.map(todo => (

                        <li key={todo.id}>


                            <span

                            onClick={()=>completeTodo(todo.id)}

                            style={{
                                textDecoration:
                                todo.completed
                                ? "line-through"
                                : "none",

                                cursor:"pointer"
                            }}

                            >

                                {todo.text}

                            </span>


                            <button

                            onClick={()=>deleteTodo(todo.id)}

                            >

                                Delete

                            </button>


                        </li>

                    ))
                }

            </ul>


        </div>

    );

}


export default TodoApp;