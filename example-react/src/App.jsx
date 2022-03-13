import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const onClick = ()=>{
    console.log(123)
  }

  return (
    <div className="App">
        <button onClick={onClick}> click me</button>
    </div>
  )
}

export default App
