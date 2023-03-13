import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  const text = `Code 0: Success Returned results successfully. 
Code 1: No Results Could not return results. The API doesn't have enough questions for your query.
Code 2: Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five) 
Code 3: Token Not Found Session Token does not exist. 
Code 4: Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.`;
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" color="initial">
        Response Codes
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
        {text}
      </Typography>
    </Box>
  );
};

export default Footer;
