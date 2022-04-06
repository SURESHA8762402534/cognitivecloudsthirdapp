import {
    Box,
    Button,
    // makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled
  } from "@mui/material";
  import { Pagination } from "@mui/material";
  import { ClassNameMap } from "@mui/material";
  // import  Pagination  from "@mui/material";
  import axios from "axios";
  import { ChangeEvent, useEffect, useState } from "react";
  import { NavigateFunction, useNavigate } from "react-router";
import FourOFour from "./FourOFour";
  
  export type posttype = any[];
  
  
  
  type datatype = {
    author: string;
    created_at: string;
    title: string;
    url: string;
    objectID: string;
  };
  
//   const useStyles = makeStyles(() => ({
//     box: {
//       justifyContent: "center",
//       alignItems: "center",
//       marginBottom: 20,
//     },
//     pageNum: {
//       justifyContent: "center",
//       alignItems: "center",
//       display:'flex'
//     },
    
    
//   }));
  
  const PostTable = (): JSX.Element => {
    const [data, setData] = useState<any>("");
    let counter: number = 0;
    let interval: NodeJS.Timer;
    const navigate: NavigateFunction = useNavigate();
    const [page, setPage] = useState(1);
    // const classes: ClassNameMap = useStyles();
  
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
      navigate("jsonData", { state: JSONData });
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
                  <TableCell style={{color:'blue', fontSize:20, fontWeight:'bold', backgroundColor:'yellow'}} align="center">AUTHOR</TableCell>
                  <TableCell style={{color:'blue', fontSize:20, fontWeight:'bold', backgroundColor:'lightgrey'}} align="center">Raw DATA</TableCell>
                </TableHead>
                <TableBody>
                  {data[page - 1].map(
                    (item: any): JSX.Element => (
                      <TableRow   key={item.objectID}>
                        <TableCell  style={{backgroundColor:"#C0C0C0"}}>{item.story_title ? item.story_title : "data not found"}</TableCell>
                        <TableCell  style={{backgroundColor:'#ffa080'}}>{item.story_url ? item.story_url : "data not found"}</TableCell>
                        <TableCell style={{backgroundColor:'#FFB6a1'}}>{item.created_at ? item.created_at : "data not found"}</TableCell>
                        <TableCell style={{backgroundColor:'lightgoldenrodyellow'}}>{item.author ? item.author : "data not found"}</TableCell>
                        <TableCell style={{backgroundColor:'lightyellow'}}>
                          <Button onClick={() => handleSubmit(item)}>
                            select
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <FourOFour/>
          )}
        </Box>
        {/* className={classes.pageNum} */}
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