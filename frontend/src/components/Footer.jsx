// src/components/Footer.js
import React from 'react';
import { Box,CssBaseline } from '@mui/material';

const Footer = () => {
  return (
    <Box className="bg-gray-800 text-white p-4 h-auto">
      <CssBaseline />
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Skyrim Wu. All rights reserved.
      </div>
    </Box>
  );
};

export default Footer;
