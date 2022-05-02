import { Route, Routes } from "react-router-dom"
import Post from "./components/PostTable"
import Rawjson from './components/Rawjson'

const App = ()=>{

  return(
    <>
    <Routes>
      <Route path="/"  element={<Post/>}/>
      <Route path="/json"  element={<Rawjson/>}/>
    </Routes>
    </>
  )
}

export default App