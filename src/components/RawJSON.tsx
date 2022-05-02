import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

const RawJSON = ()=>{
    const jsonData = useLocation().state;

    const navigate = useNavigate();

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    return(
        <>
        <Button variant="contained" sx={{m:2}} onClick={()=>navigate(-1)}> BACK</Button>
        <Typography variant="h5" sx={{textAlign:'center', textDecoration:'underline',mb:3,mt:3}}>RAW JSON DATA</Typography>
        <pre data-testid='json' >
            {JSON.stringify(jsonData,null,4)}
        </pre>
        </>
    )
}

export default RawJSON