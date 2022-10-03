import {Outlet, useSearchParams} from 'react-router-dom';
import React, { useCallback } from 'react';
import { GoodsList } from '../GoodsList/GoodsList';
import { useNavigate } from "react-router-dom";

import { Button } from '@mui/material';

import './DashboardPage.css';


const styles = {
  button: {
    margin: '0px 10px 0px 10px',
  }
};
export const DashboardPage = () => {

  const navigate = useNavigate();
  const onAddItemClicked = useCallback(() => {
    navigate('edit');
  }, [navigate]);


    const [searchParams, setSearchParams] = useSearchParams();

    const onWeightAscFilterClick = useCallback(() => {
        setSearchParams({ sort: 'weight'})
    }, [setSearchParams]);

    const onWeightDescFilterClick = useCallback(() => {
        setSearchParams({ sort: 'weightDesc'})
    }, [setSearchParams]);

  return (
    <div className='dashboard'>
      <div className='headerPanel'>
        <Button sx={styles.button} onClick={onAddItemClicked} size="small" variant='contained'>Add Item</Button>
          <Button sx={styles.button} onClick = {onWeightAscFilterClick} size="small" variant='contained'>Sort by ascending weight</Button>
          <Button  sx={styles.button} onClick = {onWeightDescFilterClick} size="small" variant='contained'>Sort by descending weight</Button>
      </div>
      <div className='dashboardContent'>
        <Outlet />
      </div>
      <GoodsList />
    </div>
  );
};