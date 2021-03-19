import { FC, memo, useCallback } from "react"
import Button from "./Button"
import { RequestStatus } from "./helpers/enums"
import { Status, ToDo } from "./redux/todo"

type Props = ToDo & {
  loading: Status
  onRemove: (todo: Partial<ToDo>) => void
}

const ToDoItem: FC<Props> = ({ loading, onRemove, id, text }) => {
  const handleRemove = useCallback(() => {
    onRemove({ id, text })
  }, [id, text, onRemove])

  console.log("ToDoItem render")

  return (
    <li>
      {text}
      <Button
        text="Remove"
        disabled={loading === RequestStatus.Pending}
        onClick={handleRemove}
      />
    </li>
  )
}

export default memo(ToDoItem)
