import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { clearInterval } from 'timers';

// interface Column {
//   id: 'name' | 'code' | 'population' | 'size' | 'density';
//   label: string;
//   minWidth?: number;
//   align?: 'right';
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toFixed(2),
//   },
// ];

// interface Data {
//   name: string;
//   code: string;
//   population: number;
//   size: number;
//   density: number;
// }

// function createData(
//   name: string,
//   code: string,
//   population: number,
//   size: number,
// ): Data {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];
 interface tabledata {
    story_title:string,
    created_at:string,
    author:string
 }

export default function Newpage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageno, setpageno] = React.useState(0)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [apidata, setapidata] = React.useState([
      {
        story_title: "",
        created_at:"",
        author:    "",
        story_id:0
      }
  ])

  const fetchapi = async() => {
      const res = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=story&page=${pageno}`);
      const resData = await res.json();
      setapidata(resData.hits)
      console.log(resData.hits);

      resData.map((ite:any) => {
                setapidata([
                    ...apidata,
                      {
                          
                          story_title: ite.story_title,
                          created_at: ite.created_at,
                          author:    ite.author,
                          story_id: ite.story_id
                      }
                  ])
          

      })

  }
//   const setint = setInterval(fetchapi,2000);
//   const clearint = clearInterval
  React.useEffect(()=>{
      if(pageno<=5){
        setInterval(()=>{setpageno(pageno+1)},5000)
        fetchapi()
      }else{
          clearInterval()
      }
    console.log(apidata);
    
  },[pageno])

  return (
      <>
      <Button variant='outlined' onClick={fetchapi}>Search</Button>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell style={{color:'blue', fontSize:'25px'}}>
                  ID
                </TableCell>
                <TableCell style={{color:'blue', fontSize:'25px'}}>
                  Title
                </TableCell>
                <TableCell style={{color:'blue', fontSize:'25px'}}>
                  Url-create-at
                </TableCell>
                <TableCell style={{color:'blue', fontSize:'25px'}}>
                  Author
                </TableCell>
               
          
            </TableRow>
          </TableHead>
          <TableBody>
           {apidata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item,idx)=>{
          
                return(
                   
                                <TableRow key={item.story_id}>
                                    <TableCell>
                                    {item.story_id}
                                </TableCell>
                                <TableCell>
                                    {item.story_title}
                                </TableCell>
                                <TableCell>
                
                                   {item.created_at}
                                </TableCell>
                                <TableCell>
                                    {item.author}
                                </TableCell>
                            </TableRow>
                   
                   )
          
           })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={apidata.length}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}
