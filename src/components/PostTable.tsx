import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { post } from "../types";
import { TableContainer, Table, Paper, TableHead, TableCell, Typography, TableBody, TableRow, CircularProgress, TableFooter } from '@mui/material'
import axios from 'axios'

const Post = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<post[]>([]);
    const [page, setPage] = useState<Number>(1);
    const [loading, setloading] = useState<boolean>(false);
    let interval: NodeJS.Timer;

    const handelPage = () => {
        setPage((p: any) => p + 1)
    }

    
    const fetchData = async () => {
        try {
            setloading(true)
            const res = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=story&page=${page}`);
            console.log(res.data.hits);
            setData((prev:any)=>[...prev, ...res.data.hits])
        }
         catch (e) {
            console.log('error');
        }
        finally{
            setloading(false)
        }
    }

    useEffect(() => {
        !loading && fetchData()
        console.log(data);
    }, [page]);

    useEffect(() => {
        interval = setInterval(handelPage, 10000);
        return () => clearInterval(interval)
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
                !loading && handelPage()
            }
        })
    }, [])

    const handelClick = (item:any)=>{
        navigate('/json', { state: item })
    }

    return (
        <>
            {data?.length > 1 ?
                <>
                    
                        <Table stickyHeader sx={{m:2}}>
                            <TableHead>
                                <TableCell align="center" sx={{ backgroundColor: 'lightyellow' }}>
                                    <Typography variant="h6">
                                        TITLE
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ backgroundColor: 'lightyellow' }}>
                                    <Typography variant="h6">
                                        URL
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ backgroundColor: 'lightyellow' }}>
                                    <Typography variant="h6">
                                        CREATED_AT
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ backgroundColor: 'lightyellow' }}>
                                    <Typography variant="h6">
                                        AUTHOR
                                    </Typography>
                                </TableCell>
                            </TableHead>

                            <TableBody>
                                {data?.map((item: any, idx: any) => {
                                    return (
                                        <TableRow
                                            data-testid={`row-${idx}`}
                                            onClick={() => handelClick(item)}
                                        >
                                            <TableCell >
                                                {item.title ? item.title : (item.story_title ? item.story_title : <i>data not found</i>)}
                                            </TableCell>
                                            <TableCell sx={{ overflow: 'hidden' }}>
                                                {item.url ? <a href={item.url}>{item.url}</a> : (item.story_url ? <a href={item.story_url}>{item.story_url}</a>: <i>data not found</i>)}
                                            </TableCell>
                                            <TableCell>
                                                {item.created_at ? item.created_at : <i>data not found</i>}
                                            </TableCell>
                                            <TableCell>
                                                {item.author ? item.author : <i>data not found</i>}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableCell colSpan={4} align='center'>
                                    {loading && <CircularProgress/>}
                                </TableCell>
                            </TableFooter>
                        </Table>

                
                </>
                :
                <>
                    <CircularProgress /> Loading...
                </>
            }
        </>
    )
}

export default Post