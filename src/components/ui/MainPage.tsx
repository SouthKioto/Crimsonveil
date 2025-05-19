import { useState } from "react"


export const MainPage = () => {

  const [counter, setCounter] = useState(0)

  const addOne = () => {
    setCounter(counter + 1)
  }

  return (
    <>
      <h1>Main page</h1>
      <button className="bg-red-500" onClick={addOne}>counter: {counter}</button>
    </>

  )
}

