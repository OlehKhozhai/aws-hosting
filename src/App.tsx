import React, { useEffect, useCallback } from "react"

import {
  getToDoListAction,
  ToDo,
  todoSelector,
  createToDoAction,
  removeToDoAction,
} from "./redux/todo"
import { useAppSelector, useAppDispatch } from "./types/hooks"
import "./App.css"
import Form from "./Form"
import ToDoItem from "./ToDoItem"

function App() {
  const { list, loading } = useAppSelector(todoSelector)
  const dispatch = useAppDispatch()

  console.log("--list--", list)

  useEffect(() => {
    dispatch(getToDoListAction())
  }, [dispatch])

  const handleSubmit = useCallback(
    (todo) => {
      if (todo && todo.trim() !== "") {
        dispatch(createToDoAction(todo))
      }
    },
    [dispatch]
  )

  const handleRemoveToDo = ({ id, text }: Partial<ToDo>) => {
    dispatch(removeToDoAction({ id, text }))
  }

  return (
    <div className="App">
      <Form loading={loading} onSubmit={handleSubmit} />

      {list?.length > 0 &&
        list.map((item) => (
          <ToDoItem
            {...item}
            key={item.id}
            loading={loading}
            onRemove={handleRemoveToDo}
          />
        ))}
    </div>
  )
}

export default App
