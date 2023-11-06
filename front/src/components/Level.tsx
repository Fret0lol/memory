import { redirect } from "react-router-dom"
import { useGame } from "../store/game"

export default function Level () {

  const { level, setLevel } = useGame()

  // function setLevel()

  function startGame() {
    redirect('/game')
  }

  return (
    <>
      <div className="levels">
        <button onClick={() => setLevel(4)} className={ level === 4 ? 'active' : ''}>4</button>
        <button onClick={() => setLevel(6)} className={ level === 6 ? 'active' : ''}>6</button>
        <button onClick={() => setLevel(8)} className={ level === 8 ? 'active' : ''}>8</button>
      </div>
      <button onClick={startGame}>Start</button>
    </>
  )
}