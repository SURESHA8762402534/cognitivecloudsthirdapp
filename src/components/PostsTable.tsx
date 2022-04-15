import { Pagination,CircularProgress, } from "@mui/material";
import { useEffect} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
  
  } from "@mui/material";
import { useNavigate } from "react-router-dom";


type Props = {
  storedData: any;
  page: any;
  setPage: any;
  navigate: any;
};

const PostsTable: React.FC<Props> = ({ ...props }) => {

  // const handlePageChange = (event: any, value: number) => {
  //   props.setPage(value);
  // };

  const handleSubmit = (JSONData: Props) => {
    props.navigate("/jsondata", { state: JSONData });
    //   alert(JSON.stringify(JSONData))
  };

 

  useEffect(()=>{
    console.log(props.storedData)
    window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
          props.setPage((prev:any)=>prev+1)
          console.log('page scrolled')
        }
      })
  },[props.storedData])
  return (
    <div>
      {props.storedData[props.page] === undefined ? (
          <>
           <CircularProgress />Loading...
          </>
       
      ) : (
        <div>
          <div
            className="table-wrapper"
            style={{ height: "100vh", width: "98vw", marginBottom:'50vh' }}
          >
              <Table stickyHeader>
              <TableHead >
                <TableCell style={{ color: 'white', fontSize: 20, fontWeight: 'bold', backgroundColor: "gray" }} align="center">TITLE</TableCell>
                <TableCell style={{ color: 'white', fontSize: 20, fontWeight: 'bold', backgroundColor: 'gray' }} align="center">URL</TableCell>
                <TableCell style={{ color: 'white', fontSize: 20, fontWeight: 'bold', backgroundColor: 'gray' }} align="center">CREATED AT</TableCell>
                <TableCell style={{ color: 'white', fontSize: 20, fontWeight: 'bold', backgroundColor: 'gray' }} align="center">AUTHOR</TableCell>
              </TableHead>
              <TableBody>
              {props.storedData.map((item: any) => {
                return (
                    <tr id='tr' onClick={() => handleSubmit(item)}  style={{ backgroundColor: "#f9f9f9" }}>
                      <TableCell >{item.story_title ? item.story_title : <Typography style={{ color: 'red' }}>data not found</Typography>}</TableCell>
                      <TableCell >{item.story_url ? item.story_url : <Typography style={{ color: 'red' }}>data not found</Typography>}</TableCell>
                      <TableCell >{item.created_at ? item.created_at : <Typography style={{ color: 'red' }}>data not found</Typography>}</TableCell>
                      <TableCell >{item.author ? item.author : <Typography style={{ color: 'red' }}>data not found</Typography>}</TableCell>
                    </tr>

                )
            })
        }
              </TableBody>
              </Table>
              
             <div>
            {/* <Pagination
              className="pagination"
              count={50}
              page={props.page}
              color="primary"
              onChange={handlePageChange}
            /> */}
          </div>
          </div>
         
        </div>
      )}
    </div>
  );
};

export default PostsTable;