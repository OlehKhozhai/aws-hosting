import { ChangeEvent, FC, memo, useState } from "react"
import Button from "./Button"
import { RequestStatus } from "./helpers/enums"
import { Status } from "./redux/todo"

type Props = {
  loading: Status
  onSubmit: (value: string) => void
}

const Form: FC<Props> = ({ onSubmit, loading }) => {
  const [value, setValue] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (value && value.trim() !== "") {
      onSubmit(value)
      setValue("")
    }
  }

  console.log("FORM render")

  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={handleChange} />

      <Button
        type="submit"
        text="Add"
        disabled={loading === RequestStatus.Pending}
      />
    </form>
  )
}

export default memo(Form)
