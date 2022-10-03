import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import { Typography, Button } from '@mui/material';

import './WelcomePage.css'

export const WelcomePage = () => {

  const navigate = useNavigate();

  const onButtonClick = useCallback(() => {
    navigate('/app')
  }, [navigate]);

  return (
    <div className='welcomeContainer'>
      <Typography variant="h5" component="div">Hello!</Typography>
      <Button onClick={onButtonClick} variant="contained">Open App!</Button>
    </div>
  )
}