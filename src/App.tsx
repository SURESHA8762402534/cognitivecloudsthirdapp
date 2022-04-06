import './App.css';
import { Route, Routes } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import RawJSON from './components/RawJSON';



function App() {
  return (
    <>
    
   
      <Routes>
      <Route path="/" element={<FrontPage/>}/>
      <Route path='/jsondata' element={<RawJSON/>}/>
       
      </Routes>
    </>
  );
}

export default App;
