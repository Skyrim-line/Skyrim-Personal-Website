import React from "react";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      className="bg-white dark:bg-background-dark text-black dark:text-white text-center p-4 shadow-md"
    >
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Skyrim Wu. All rights reserved.
      </div>
    </Box>
  );
};

export default Footer;
