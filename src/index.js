import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Board";
import GameOver from "./pages/GameOver";

export default function App() {
  const [winner, setWinner] = useState(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game winner={winner} setWinner={setWinner}/>}> </Route>
        <Route path="/game-over" element={<GameOver winner={winner}/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);