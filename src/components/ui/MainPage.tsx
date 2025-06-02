import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Login } from "./Login/Login"

type Wife = {
  name: string,
  surname: string,
}

type Person = {
  name: string,
  surname: string,
  wife: Wife;
}



export const MainPage = () => {

  const [counter, setCounter] = useState(0);

  const obj: Person = {
    name: 'name',
    surname: 'surname',
    wife: {
      name: 'wife_name',
      surname: 'wife_surname'
    }
  }

  const addOne = () => {
    setCounter(counter + 1)
  }

  return (
    <>
      <h1>Main page</h1>
      <button className="bg-red-500 rounded-2xl p-2" onClick={addOne}>counter: {counter}</button>

      <br></br>
      <NavLink to={"/game"}>
        <button className="bg-blue-700 rounded-2xl p-3 hover:bg-gradient-to-r from-pink-500-500 from-10% via-white via-30% to-orange-500 to-90% transition delay-150 duration-300 ease-in-out hover:border-5 border-black">Siema to jest button sluzacy do przejscia do gry XD</button>
      </NavLink>

      <h1>{obj.name}, {obj.surname}, {obj.wife.name}</h1>

      <button>Siema</button>

      <Login />
    </>

  )
}

