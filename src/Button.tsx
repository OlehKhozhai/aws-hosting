import { ButtonHTMLAttributes, FC, memo } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
}

const Button: FC<Props> = ({ text, ...rest }) => {
  console.log("renderBTN")
  return <button {...rest}>{text}</button>
}

export default memo(Button)
