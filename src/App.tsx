import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RawJSON from './components/RawJSON';
import { useEffect, useState } from 'react';
import PostsTable from './components/PostsTable';

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [storedData, setStoredData]: any = useState([]);
  const navigate = useNavigate();
  let interval: NodeJS.Timer;

  const fetchTableData = async () => {
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search_by_date?query=story&page=${page}`
    );
    const resData = await response.json();
    
  console.log(resData)
    if (!storedData.includes(...resData.hits)) {
      setStoredData([...storedData,  ...resData.hits ]);
    }
  };


  const handelPage = ()=>{
    setPage((page)=>page+1)
    console.log('page called');
    // console.log(storedData)
  }

  useEffect(() => {
    fetchTableData();
  }, [page]);

  useEffect(()=>{
    interval = setInterval(handelPage,10000)
  },[])

  return (
    <div className="app">
      <Routes>
        
        <Route
          path="/"
          element={
            <PostsTable
              storedData={storedData}
              page={page}
              setPage={setPage}
              navigate={navigate}
            />
          }
        />
         <Route path='/jsondata' element={<RawJSON/>}/>
      </Routes>
    </div>
  );
};


export default App;
