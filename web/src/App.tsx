import './styles/global.css';

import { Habit } from "./components/Habit"

function App() {
  return (
    <div>
    <Habit completed={4}/>
    <Habit completed={20}/>
    <Habit completed={5}/>
    <Habit completed={10}/>
    </div>
  )
}

export default App

