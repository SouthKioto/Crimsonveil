import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MainPage } from './components/ui/MainPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GamePage } from './components/ui/GamePage.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />

        <Route path='/game' element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
