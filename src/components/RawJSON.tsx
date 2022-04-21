import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router";

type Props = {
  navigate:any
}

const RawJSON:React.FC<Props> = ({...props}): JSX.Element => {

  const navigate: NavigateFunction = useNavigate();
  const local: unknown = useLocation().state;
    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [local]);
  return (
    <Box>
      <span>
      <Button variant="contained" onClick={()=>props.navigate(-1)}> Back </Button>
      <Box  display="flex"  justifyContent="center" component={"h1"}>
        RAW JSON DATA
      </Box>
      
      </span>
      <Box style={{marginTop:50}} ><pre>{JSON.stringify(local,null,3)}</pre></Box>
    
    </Box>
  );
};
export default RawJSON;