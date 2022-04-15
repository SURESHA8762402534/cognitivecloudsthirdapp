import { Box, Button } from "@mui/material";
import { NavigateFunction, useLocation, useNavigate } from "react-router";



const RawJSON = (): JSX.Element => {

  const navigate: NavigateFunction = useNavigate();
  const local: unknown = useLocation().state;
    const handleClick = () => {
        navigate(-1);
    }

  return (
    <Box>
      <Box  display="flex"  justifyContent="center" component={"h1"}>
        Raw JSON Data
      </Box>
      <Button variant="contained" onClick={handleClick}> Back </Button>
      <Box style={{marginTop:50}} ><pre>{JSON.stringify(local,null,2)}</pre></Box>
     
    </Box>
  );
};
export default RawJSON;