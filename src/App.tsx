import './App.css';
import { Route, Routes } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import Newpage from './components/Newpage';
import RawJSON from './components/RawJSON';
import FourOFour from './components/FourOFour';


function App() {
  return (
    <>
    <FrontPage/>
    {/* <Newpage/> */}
      <Routes>
      <Route path="/jsonData" element={<RawJSON/>}/>
        {/* <Route path='/' element={<FourOFour/>}/> */}
      </Routes>
    </>
  );
}

export default App;
