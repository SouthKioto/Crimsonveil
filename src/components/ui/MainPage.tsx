import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "./elements/Navbar";
import { Body } from "./elements/Body";

export const MainPage = () => {
  return (
    <>
      <Navbar />
      <Body />

      <div className="border-white border-5">
        <b>
          <p className="text-red-500 text-3xl">
            !To będzie po zalogowaniu sie uzytkownika dostepne!
          </p>
        </b>
        <NavLink to={"/game"}>
          <button className="bg-blue-700 rounded-2xl p-3 hover:bg-gradient-to-r from-pink-500-500 from-10% via-white via-30% to-orange-500 to-90% transition delay-150 duration-300 ease-in-out hover:border-5 border-black">
            Siema to jest button sluzacy do przejscia do gry XD
          </button>
        </NavLink>
        <br></br>
        <NavLink to={"/game-ui"}>
          <button className="bg-blue-700 rounded-2xl p-3 hover:bg-gradient-to-r from-pink-500-500 from-10% via-white via-30% to-orange-500 to-90% transition delay-150 duration-300 ease-in-out hover:border-5 border-black">
            Game ui
          </button>
        </NavLink>
      </div>
    </>
  );
};
