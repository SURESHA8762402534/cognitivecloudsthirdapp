import './App.css';
import { Route, Routes } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import RawJSON from './components/RawJSON';



function App() {
  return (
    <>
    <FrontPage/>
   
      <Routes>
      <Route path="/jsonData" element={<RawJSON/>}/>
       
      </Routes>
    </>
  );
}

export default App;
