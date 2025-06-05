import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainPage } from "./components/ui/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GamePage } from "./components/ui/GamePage.tsx";
import { Game_Ui } from "./components/react-game-ui/Game_Ui.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/game" element={<GamePage />} />

        <Route path="/game-ui" element={<Game_Ui />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
