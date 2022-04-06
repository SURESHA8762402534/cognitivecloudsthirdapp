import {
    Alert,
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination,
    CircularProgress

  } from "@mui/material";

  import SaveIcon from '@mui/icons-material/Save';
  import axios from "axios";
  import {  useEffect, useState } from "react";
  import { NavigateFunction, useNavigate } from "react-router";

  
  export type posttype = any[];
  
  
  
  type datatype = {
    author: string;
    created_at: string;
    title: string;
    url: string;
    objectID: string;
  };
  
  
  const PostTable = (): JSX.Element => {
    const [data, setData] = useState<any>("");
    let counter: number = 0;
    let interval: NodeJS.Timer;
    const navigate: NavigateFunction = useNavigate();
    const [page, setPage] = useState(1);
 
  
    const apiRequest = () => {
      axios
        .get(
          "http://hn.algolia.com/api/v1/search?query=search_by_data&page=" +
            counter
        )
        .then((res) => {
          console.log("response", res);
          console.log(res?.data?.exhaustiveNbHits);
          if (res?.data?.exhaustiveNbHits) {
            setData((prev: any) => [...prev, res?.data?.hits]);
            counter = counter + 1;
           
          } else {
            clearInterval(interval);
          }
        })
        .catch((err) => {
          console.log("error:", err);
        });
  
    };
  
  
  
    const handleSubmit = (JSONData: datatype) => {
      navigate("/jsondata", { state: JSONData });
    //   alert(JSON.stringify(JSONData))
    };
 
    useEffect(() => {
      apiRequest();
      interval = setInterval(apiRequest, 10000);
    }, []);
  
  
    return (
      <div>
      
        <Box >
          {data.length > 0 ? (
            <TableContainer style={{ height: 600, marginTop:10, marginBottom:20 }} component={Paper}>
              <Table stickyHeader>
                <TableHead >
                  <TableCell style={{color:'blue', fontSize:20, fontWeight:'bold', backgroundColor:"gray"}} align="center">TITLE</TableCell>
                  <TableCell style={{color:'blue', fontSize:20, fontWeight:'bold', backgroundColor:'lightcoral'}} align="center">URL</TableCell>
                  <TableCell style={{color:'blue', fontSize:20, fontWeight:'bold', backgroundColor:'lightpink'}} align="center">CREATED AT</TableCell>
                  <TableCell style={{color:'blue', fontSize:20, fontWeight:'bold', backgroundColor:'lightgrey'}} align="center">AUTHOR</TableCell>
                </TableHead>
                <TableBody>
                  {data[page - 1].map(
                    (item: any): JSX.Element => (
                      <TableRow onClick={() => handleSubmit(item)}  key={item.objectID}>
                        <TableCell  style={{backgroundColor:"#C0C0C0"}}>{item.story_title ? item.story_title : "data not found"}</TableCell>
                        <TableCell  style={{backgroundColor:'#ffa080'}}>{item.story_url ? item.story_url : "data not found"}</TableCell>
                        <TableCell style={{backgroundColor:'#FFB6a1'}}>{item.created_at ? item.created_at : "data not found"}</TableCell>
                        <TableCell  style={{backgroundColor:'lightgoldenrodyellow'}}>{item.author ? item.author : "data not found"}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (    
        <h1>
             <CircularProgress />Loading...
        </h1>
          )}
        </Box>
       
        <Pagination 
          page={page}
          count={data.length}
          onChange={(e: any, selectedPage: number) => {
            console.log("abc", selectedPage);
            setPage(selectedPage);
          }}
        />
           
      </div>
    );
  };
  export default PostTable;