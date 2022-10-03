import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Button, CircularProgress, TextField } from '@mui/material';

import { deleteItemThunk, editItemThunk } from '../../rdx/goods/thunks';
import { selectIsItemRemoving, selectIsItemUpdating } from '../../rdx/goods/selectors'; 
import './GoodsItemCard.css';

export const GoodsItemCard = ({ item, index }) => {
  const dispatch = useDispatch();
  const isCurrentItemRemoving = useSelector(selectIsItemRemoving)[item.id];
  const isItemUpdating = useSelector(selectIsItemUpdating)[item.id];
  
  const [isItemEditing, setIsItemEditing] = useState(false);

  const [editItem, setEditItem] = useState(item || {});

  useEffect(() => {
    setEditItem(item);
  }, [item]);
  
  const onItemChange = useCallback((event) => {
    setEditItem({
      ...editItem,
      [event.target.name]: event.target.value,
    });
  }, [editItem]);


  const onItemRemove = useCallback(() => {
    dispatch(deleteItemThunk(item.id));
  }, [item, dispatch]);

  const onSaveItem = useCallback(() => {
    dispatch(editItemThunk({
      ...editItem,
    }));
  }, [editItem, dispatch]);

  const onEditItem = useCallback(() => {
    if (isItemEditing) {
      onSaveItem();
    }
    setIsItemEditing(!isItemEditing);
  }, [isItemEditing, onSaveItem]);

  return (
    <div >
      <Grid className='elementRow' container p={1} m={1}>
        <Grid item md={1}>
          {index+1}
        </Grid>
        <Grid item md={2}>
          {isItemEditing ? (
            <TextField 
              id="standard-basic" 
              margin="dense" 
              fullWidth 
              name='title' 
              label="Title" 
              variant="standard" 
              onChange={onItemChange} 
              value={editItem.title} 
            /> ) : <Typography variant="Caption" >{editItem.title}</Typography>}
        </Grid>
        <Grid item md={2} m={1}>
          {isItemEditing ? (
            <TextField 
              id="standard-basic"
              margin="dense" 
              fullWidth 
              name='description' 
              label="Description" 
              variant="standard" 
              onChange={onItemChange} 
              value={editItem.description}
            />
          ) : <Typography variant="Caption" >{editItem.description}</Typography>}
        </Grid>
        <Grid item md={2} m={1}>
          {isItemEditing ? (
            <TextField 
              id="standard-basic" 
              margin="dense" 
              fullWidth 
              name='weight' 
              label="Weight" 
              variant="standard" 
              onChange={onItemChange} 
              value={editItem.weight} 
            />
          ) : <Typography variant="Caption" >{editItem.weight}</Typography>}
        </Grid>
        <Grid item md={2} m={1}>
          {isItemEditing ? (
            <TextField 
              id="standard-basic" 
              margin="dense" 
              fullWidth 
              name='category' 
              label="Category" 
              variant="standard" 
              onChange={onItemChange} 
              value={editItem.category} 
            />
          ) : <Typography variant="Caption" >{editItem.category}</Typography>}
        </Grid>
        <Grid item md={1} className='buttonGridItem'>
          {isItemUpdating ? <CircularProgress color="success" size={24} /> : <Button onClick={onEditItem} size="small" variant='contained'>{isItemEditing ? 'Done' : 'Edit'}</Button>}
        </Grid>
        <Grid item md={1} className='buttonGridItem'>
          {isCurrentItemRemoving ? <CircularProgress color="success" size={24} /> : <Button onClick={onItemRemove} size="small" variant='contained'>Remove</Button>}
        </Grid>
      </Grid>
    </div>
  );
};

GoodsItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
  }),
  index: PropTypes.number,
};